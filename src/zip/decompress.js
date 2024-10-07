import { access } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream';

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
const decompressFiles = async (file, zipFile) => {
  let isFileExists = await checkFile(zipFile);
  if (!isFileExists) {
    throw new Error(`*** Compress operation failed. Not a such file : ${zipFile}`);
  }
  const read = createReadStream(zipFile);
  const gzip = createGunzip();;
  const write = createWriteStream(file);

  pipeline(read, gzip, write, (err) => {
    if (err) {
      process.exitCode = 1;
      throw new Error(`*** Decompress operation failed. Err: ${err}`);
    }
  });

  console.log(`*** File ${basename(zipFile)} has been decompressed to ${basename(file)}`);
}

const decompress = async () => {
  const file = join(__dirname, 'files', 'fileToCompress.txt');
  const zipFile = join(__dirname, 'files', 'archive.gz');
  await decompressFiles(file, zipFile).catch((err) => console.error(err.message));
};

await decompress();
