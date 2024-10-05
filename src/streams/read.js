import { createReadStream } from 'node:fs';
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

const readText = async (file) => {
  let isFileExists = await checkFile(file);
  if (!isFileExists) {
    throw new Error(`*** FS operation failed. Not a such file : ${file}`);
  }

  const { stdout } = process;
  const stream = createReadStream(file, 'utf-8');
  let data = '';

  stream.on('data', (chunk) => {
    data += chunk;
  });

  stream.on('end', () => {
    stdout.write('*** Content of file\n');
    stdout.write(data + "\n" || 'No content to display' + "\n");
    stdout.write('*** End\n');
    stdout.end();
  });

  stream.on('error', (error) => {
    console.error('Error:', error.message);
  });
};

const read = async () => {
  // Set the working directory to the directory with the program file
  // console.log('Current working directory:', process.cwd());
  process.chdir(dirname(fileURLToPath(import.meta.url)));

  const _filename = fileURLToPath(import.meta.url);
  const _dirname = dirname(_filename);
  const file = join(_dirname, 'files', 'fileToRead.txt');
  await readText(file).catch((err) => console.error(err.message));
}

await read();
