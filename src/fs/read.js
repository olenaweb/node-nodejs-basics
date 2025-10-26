// read.js - implement function that prints content of the fileToRead.txt into console 
// (if there's no file fileToRead.txt Error with message FS operation failed must be thrown)
// fsPromises.readFile(path[, options])
import { access, readFile } from 'node:fs/promises';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const checkFile = async (file) => {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
};
const readContents = async (file) => {
  let isFileExists = await checkFile(file);
  if (!isFileExists) {
    throw new Error(`*** FS operation failed. Not a such file : ${file}`);
  }
  const contents = await readFile(file, { encoding: 'utf8' });
  console.log(contents);
}
const read = async () => {
  const file = join(_dirname, 'files', 'fileToRead.txt');
  await readContents(file).catch((err) => console.error(err.message));
};

await read();
