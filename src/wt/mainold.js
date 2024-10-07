import { join } from 'node:path';
import os from 'os';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const workerScript = join(__dirname, 'worker.js');
console.log('"workerScript"', workerScript);
const countCPU = os.cpus().length;
console.log('"countCPU="', countCPU);


const performCalculations = async () => {
  if (isMainThread) {
    const results = [];

    for (let i = 0; i < countCPU; i++) {
      const worker = new Worker(workerScript, { workerData: i + 10 });

      worker.on('message', (result) => {
        results.push({ status: 'resolved', data: result });

        if (results.length === countCPU) {
          console.log(results);
        }
      });

      worker.on('error', (error) => {
        results.push({ status: 'error', data: null });

        if (results.length === countCPU) {
          console.log(results);
        }
      });
    }
  }
};

await performCalculations();
