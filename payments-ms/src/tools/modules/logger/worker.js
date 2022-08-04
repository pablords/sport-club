const { parentPort, workerData } = require('worker_threads');
fs = require('fs');
path = require('path');

async function execute() {
  const { log } = workerData;
  //kafka service
  parentPort.postMessage({ done: true });
}
execute();
