import { fork } from 'node:child_process';
import { access } from 'node:fs/promises';

import { dirname, join, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const checkFile = async (file) => {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
};

const spawnChildProcessFile = async (file, args) => {
  let isFileExists = await checkFile(file);
  if (!isFileExists) {
    throw new Error(`*** Process operation failed. Not a such file of script: ${file}`);
  }

  const childProcess = fork(
    file,
    args,
    {
      stdio: ['pipe', 'pipe', 'inherit', 'ipc',]
    }
  );
  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);
};

const spawnChildProcess = async (arg) => {
  const file = join(__dirname, 'files', 'script.js');
  spawnChildProcessFile(file, arg).catch((err) => console.error(err.message));

}

spawnChildProcess(['someArgument1', 'someArgument2']);
