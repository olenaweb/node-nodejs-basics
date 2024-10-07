import { createWriteStream } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname, join, basename } from 'path';
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

  process.stdout.write('Enter your information below and press <Enter>. To complete the entry, enter : Ctrl-C.\n');
  const writableStream = createWriteStream(file);
  process.stdin.pipe(writableStream);

  // Processing the SIGINT signal (Ctrl-C)
  process.on('SIGINT', () => {
    process.stdin.unpipe(writableStream); // Disable the stream from stdin
    writableStream.end();                 // Finish writing to the file
  });

  writableStream.on('finish', () => {
    console.log(`*** The data has been written to file: ${basename(file)}`);
    process.exit();        // complete the process after recording the data
  });

  writableStream.on('error', (error) => {
    throw new Error('*** Write operation failed.' + error.message);
  });
};

const write = async () => {
  process.chdir(dirname(fileURLToPath(import.meta.url)));

  const _filename = fileURLToPath(import.meta.url);
  const _dirname = dirname(_filename);
  const file = join(_dirname, 'files', 'fileToWrite.txt');
  await writeText(file).catch((err) => console.error(err.message));
};

await write();
