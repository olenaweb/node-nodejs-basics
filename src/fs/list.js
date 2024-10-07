// list.js - implement function that prints all array of filenames from files folder into console 
// (if files folder doesn't exists Error with message FS operation failed must be thrown)
import { access, readdir } from 'node:fs/promises';

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
const listDir = async (dir) => {
  let isFileExists = await checkFile(dir);
  if (!isFileExists) {
    throw new Error(`*** FS operation failed. Not a such directory : ${dir}`);
  }
  const files = await readdir(dir, { withFileTypes: true }); // fs.Dirent
  console.log(`*** List of files directory ${dir}: `);
  for (let file of files) {
    console.log(`${file.name}`);
  }
}

const list = async () => {
  const dir = join(_dirname, 'files');
  await listDir(dir).catch((err) => console.error(err.message));
};

await list();
