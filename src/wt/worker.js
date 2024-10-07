import { workerData, parentPort } from 'worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

const sendResult = () => {
  try {
    // Calculate Fibonacci and send result to main thread
    const result = nthFibonacci(workerData);
    parentPort.postMessage(result);
  } catch (error) {
    // Send error if any exception occurs
    parentPort.postMessage({ status: 'error', data: null });
  }
};

sendResult();
