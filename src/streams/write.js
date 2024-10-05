import { createWriteStream } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { access } from 'node:fs/promises';

const checkFile = async (file) => {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
};

const writeText = async (file) => {
  let isFileExists = await checkFile(file);
  if (!isFileExists) {
    throw new Error(`*** FS operation failed. Not a such file : ${file}`);
  }

  process.stdout.write('Enter your information below. To complete the entry, enter : Ctrl-C.\n ');
  const writableStream = createWriteStream(file);
  process.stdin.pipe(writableStream);

  writableStream.on('finish', () => {
    console.log('Data has been written to ' + file);
  });

  writableStream.on('error', (error) => {
    throw new Error('*** Write operation failed.' + error.message);
  });
};

const write = async () => {
  // Set the working directory to the directory with the program file
  // console.log('Current working directory:', process.cwd());
  process.chdir(dirname(fileURLToPath(import.meta.url)));

  const _filename = fileURLToPath(import.meta.url);
  const _dirname = dirname(_filename);
  const file = join(_dirname, 'files', 'fileToWrite.txt');
  await writeText(file).catch((err) => console.error(err.message));
}

await write();
