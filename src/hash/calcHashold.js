
import { access } from 'node:fs/promises';

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

const calculateHashFile = async (file, secret) => {
  let isFileExists = await checkFile(file);
  if (!isFileExists) {
    throw new Error(`*** Hash operation failed. Not a such file : ${file}`);
  }
  const { createHmac } = await import('node:crypto');
  const hashFile = createHmac('sha256', secret)
    .update(file)
    .digest('hex');
  console.log(`*** ${basename(file)} hash: ` + hashFile);
}
const calculateHash = async () => {
  const file = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const secret = 'RSS';
  calculateHashFile(file, secret).catch((err) => console.error(err.message));
};

await calculateHash();
