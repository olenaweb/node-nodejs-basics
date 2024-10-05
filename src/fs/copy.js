import { access, copyFile, readdir, mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const copyDirectory = async (sourceDir, targetDir) => {
  try {
    await access(sourceDir);
  } catch (err) {
    throw new Error(`*** FS operation failed. Directory not found: ${sourceDir}`);
  }

  try {
    await mkdir(targetDir, { recursive: false });
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new Error(`*** FS operation failed. Directory already exists: ${targetDir}`);
    } else {
      throw err;
    }
  }

  // Recursive function to copy files
  const copyAllFiles = async (currentSource, currentTarget) => {
    const files = await readdir(currentSource, { withFileTypes: true }); // fs.Dirent
    for (const file of files) {
      const sourcePath = join(currentSource, file.name);
      const targetPath = join(currentTarget, file.name);

      // If the element is a directory, recursively copy its contents
      if (file.isDirectory()) {
        await mkdir(targetPath);
        await copyAllFiles(sourcePath, targetPath);
        // Copying files
      } else if (file.isFile()) {
        await copyFile(sourcePath, targetPath);
      }
    }
  };

  await copyAllFiles(sourceDir, targetDir);
  console.log(`*** All files successfully copied to: ${targetDir}`);
};

const copy = async () => {
  const sourceDir = join(_dirname, 'files');
  const targetDir = join(_dirname, 'files_copy');

  try {
    await copyDirectory(sourceDir, targetDir);
  } catch (err) {
    console.error(err.message);
  }
};

await copy();
