// create.js - implement function that creates new file fresh.txt with content
//  I am fresh and young inside of the files folder 
//  (if file already exists Error with message FS operation failed must be thrown)
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const pathFile = path.join(_dirname, 'files', 'fresh.txt');

const checkFile = async (file) => {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
};

const create = async (file) => {
  const content = 'I am fresh and young';
  const isFileExists = await checkFile(file);

  if (isFileExists) {
    throw new Error('*** FS operation failed. File already exists: ' + file);
  }

  await fs.writeFile(file, content);
  console.log(`*** File created: ${file}`);
};

create(pathFile).catch((err) => console.error(err.message));
