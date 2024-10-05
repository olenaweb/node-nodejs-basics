// args.js - implement function that parses command line arguments 
// (given in format --propName value --prop2Name value2, you don't need to validate it)
//  and prints them to the console in the format propName is value, prop2Name is value2
// console.log(' process.argv= ', process.argv);
// node src/cli/args.js --some-arg value1 --other 1337 --arg2 42

const parseArgs = () => {
  let str = '';
  process.argv.forEach((val, i) => {
    if (i % 2 === 0 && i > 1) {
      str = val.slice(2);
    } else if (i % 2 !== 0 && i > 1) {
      console.log(str + ' is ' + val);
      str = '';
    }
  });
};

parseArgs();
