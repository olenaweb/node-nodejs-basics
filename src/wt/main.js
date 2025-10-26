import { join } from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { Worker } from 'node:worker_threads';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const workerScript = join(__dirname, 'worker.js');
const countCPU = os.cpus().length;

const performCalculations = async () => {
  const results = new Array(countCPU);

  for (let i = 0; i < countCPU; i++) {
    const worker = new Worker(workerScript, { workerData: i + 10 });

    worker.on('message', (result) => {
      results[i] = { status: 'resolved', data: result };

      if (results.filter(Boolean).length === countCPU) {
        console.log(results);
      }
    });

    worker.on('error', () => {
      results[i] = { status: 'error', data: null };
      if (results.filter(Boolean).length === countCPU) {
        console.log(results);
      }
    });
  }
};

await performCalculations();
