import { access } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


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

const calculateHashFile = async (file) => {
  let isFileExists = await checkFile(file);
  if (!isFileExists) {
    throw new Error(`*** Hash operation failed. Not a such file : ${file}`);
  }
  const hash = createHash('sha256');

  const stream = createReadStream(file);

  stream.on('data', (chunk) => {
    hash.update(chunk); // Update the hash with each piece of data
  });

  stream.on('end', () => {
    const hexHash = hash.digest('hex'); // hash in hex format
    console.log(`SHA256 Hash: ${hexHash}`);
  });

  stream.on('error', (error) => {
    console.error('Error:', error.message);
    throw new Error("*** Hash operation failed. " + error.message);

  });
};

const calculateHash = async () => {
  const file = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  calculateHashFile(file).catch((err) => console.error(err.message));
};

await calculateHash();
