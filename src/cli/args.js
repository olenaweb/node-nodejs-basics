const parseArgs = () => {
  const args = process.argv.slice(2);

  for (let i = 0; i < args.length; i += 2) {
    const argName = args[i];
    const argValue = args[i + 1];

    if (argName && argName.startsWith('--')) {
      const cleanArgName = argName.slice(2);

      if (argValue !== undefined && !argValue.startsWith('--')) {
        console.log(`${cleanArgName} is ${argValue}`);
      } else {
        console.log(`${cleanArgName} is (no value provided)`);
        if (argValue && argValue.startsWith('--')) {
          i -= 1;
        }
      }
    }
  }
};

parseArgs();
