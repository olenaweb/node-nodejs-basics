// env.js - implement function that parses environment variables with prefix RSS_
//  and prints them to the console in the format RSS_name1=value1; RSS_name2=value2
// npx cross-env SOME=any RSS_foo=bar RSS_bar=baz node src/cli/env.js

const parseEnv = () => {
  const envs = process.env;
  console.log('*** Environment variables with prefix RSS_ ');
  for (const name in envs) {
    const namePart = name.split('_');
    if (namePart[0] === 'RSS') { console.log(`${name} =  ${envs[name]};`); }
  }
};

parseEnv();