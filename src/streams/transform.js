// transform.js - implement function that reads data from process.stdin,
//  reverses text using Transform Stream and then writes it into process.stdout
import { Transform } from 'stream';

const transform = async () => {
  process.stdout.write('Enter your information below and press <Enter>. To complete the entry, enter : Ctrl-C.\n ');
  const reverseStream = new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = chunk.toString().split('').reverse().join('');
      this.push(reversedChunk);
      callback();
    }
  });
  process.stdin.pipe(reverseStream).pipe(process.stdout);
};

await transform();

