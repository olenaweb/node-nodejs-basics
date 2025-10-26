const parseArgs = () => {
  const args = process.argv.slice(2);

  for (let i = 0; i < args.length; i += 2) {
    const argName = args[i];
    const argValue = args[i + 1];

    if (argName && argName.startsWith('--') && argValue !== undefined) {
      const cleanArgName = argName.slice(2);
      console.log(`${cleanArgName} is ${argValue}`);
    }
  }
};

parseArgs();
