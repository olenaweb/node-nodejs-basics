const parseArgs = () => {
  let line = '';
  process.argv.forEach((arg, i) => {
    if (i % 2 === 0 && i > 1) {
      line = arg.slice(2);
    } else if (i % 2 !== 0 && i > 1) {
      console.log(line + ' is ' + arg);
      line = '';
    }
  });
};

parseArgs();
