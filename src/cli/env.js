
const parseEnv = () => {
  const envs = process.env;
  console.log('*** Environment variables with prefix RSS_ ');
  for (const item in envs) {
    const itemPart = item.split('_');
    if (itemPart[0] === 'RSS') {
      console.log(`${item} =  ${envs[item]};`);
    }
  }
};

parseEnv();