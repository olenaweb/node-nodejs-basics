// rename.js - implement function that renames file wrongFilename.txt
//  to properFilename with extension.md
//   (if there's no file wrongFilename.txt or properFilename.md already exists
//   Error with message FS operation failed must be thrown)
import { access, rename as renameFile } from 'node:fs/promises';

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

const renameFiles = async (oldfile, newfile) => {

  let isFileExists = await checkFile(oldfile);
  if (!isFileExists) {
    throw new Error(`*** FS operation failed. Not a such file : ${oldfile}`);
  }

  isFileExists = await checkFile(newfile);
  if (isFileExists) {
    throw new Error(`*** FS operation failed. File already exists:  ${newfile}`);
  }

  await renameFile(oldfile, newfile);
  console.log(`*** file ${newfile} renamed`);
};

const rename = async () => {
  const oldfile = join(_dirname, 'files', 'wrongFilename.txt');
  const newfile = join(_dirname, 'files', 'properFilename.md');
  await renameFiles(oldfile, newfile).catch((err) => console.error(err.message));
}
await rename();


