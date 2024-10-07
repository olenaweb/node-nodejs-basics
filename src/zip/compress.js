import { access } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'node:zlib';

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
const compressFiles = async (archFile, zipFile) => {
  let isFileExists = await checkFile(archFile);
  if (!isFileExists) {
    throw new Error(`*** Compress operation failed. Not a such file : ${archFile}`);
  }
  const read = createReadStream(archFile);
  const gzip = createGzip();
  const write = createWriteStream(zipFile);
  read.pipe(gzip).pipe(write);
  console.log(`*** File ${basename(archFile)} has been compressed to ${basename(zipFile)}`);
}

const compress = async () => {
  const archFile = join(__dirname, 'files', 'fileToCompress.txt');
  const zipFile = join(__dirname, 'files', 'archive.gz');
  await compressFiles(archFile, zipFile).catch((err) => console.error(err.message));
};

await compress();
