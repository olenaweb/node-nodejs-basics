import { access } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';

import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

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
const compressFiles = async (file, zipFile) => {
  let isFileExists = await checkFile(file);
  if (!isFileExists) {
    throw new Error(`*** Compress operation failed. Not a such file : ${file}`);
  }
  const read = createReadStream(file);
  const gzip = createGzip();
  const write = createWriteStream(zipFile);

  pipeline(read, gzip, write, (err) => {
    if (err) {
      process.exitCode = 1;
      throw new Error(`*** Compress operation failed. Err: ${err}`);
    }
  });

  // try {
  //   read.pipe(gzip).pipe(write);
  // }
  // catch (err) {
  //   throw new Error(`*** Compress operation failed. Err: ${err}`);
  // }
  console.log(`*** File ${basename(file)} has been compressed to ${basename(zipFile)}`);
}

const compress = async () => {
  const file = join(__dirname, 'files', 'fileToCompress.txt');
  const zipFile = join(__dirname, 'files', 'archive.gz');
  await compressFiles(file, zipFile).catch((err) => console.error(err.message));
};

await compress();
