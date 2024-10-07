// delete.js - implement function that deletes file fileToRemove.txt 
// (if there's no file fileToRemove.txt 
// Error with message FS operation failed must be thrown)
import { access, unlink } from 'node:fs/promises';

import { fileURLToPath } from 'url';
import { dirname, join, basename } from 'path';

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
const removeFile = async (file) => {
  let isFileExists = await checkFile(file);
  if (!isFileExists) {
    throw new Error(`*** FS operation failed. Not a such file : ${file}`);
  }

  await unlink(file);
  console.log(`*** file ${basename(file)} has been removed`);
};
const remove = async () => {
  const file = join(_dirname, 'files', 'fileToRemove.txt');
  await removeFile(file).catch((err) => console.error(err.message));
};

await remove();