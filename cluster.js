const cluster = require("cluster");
const os = require("os");
const numCPUS = os.cpus().length;

const process = require("process");
const app = require("./server");

const workers = {};
if (cluster.isMaster) {
  //主进程分支 判断当前执行的进程是否为主进程，为主进程则创建子进程，否则用子进程监听服务
  // 上面代码既会执行 if 又会执行 else ，这看似很奇怪，但其实不是在同一次执行的
  // ，主进程执行时会通过 cluster.fork 创建子进程，当子进程被创建会将该文件再次执行，此时则会执行 else 中对服务的监听，还有另一种用法将主进程和子进程执行的代码拆分开，逻辑更清晰，用法如下。
  cluster.on("exit", (worker, code, signal) => {
    console.log(`工作进程%d关闭（%s）.重启中`, cluster.worker.process.pid, signal || code);
    delete workers[worker.process.pid];
    worker = cluster.fork();
    workers[worker.process.pid] = worker;
  });
  console.log(`numCPUS:`, numCPUS);
  for (let i = 0; i < numCPUS; i++) {
    let worker = cluster.fork();
    console.log("init....pid", worker.process.pid);
    workers[worker.process.pid] = worker;
  }
} else {
  app.listen("8080", (err) => {
    if (err) {
      console.log("启动错误");
    } else {
      console.log("启动成功");
    }
  });
}
//当主进程被终止时，关闭所有工作进程
process.on("SIGTERM", function () {
  for (let pid in workers) {
    process.kill(pid);
  }
  process.exit(0);
});