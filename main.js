const fs = require('node:fs');
const { createHash } = require('node:crypto');

extractUser = line => {
  const lineArray = line.split(/\s*,\s*/);
  const user = {
    id: lineArray[0],
    name: lineArray[1],
    password: lineArray[2],
    consent: lineArray[3],
  }
  // Hash the password
  const hash = createHash('sha256');
  user.hash = hash.update(user.password).digest('hex');
  return user;
};

readCsv = () => {
  const csv = fs.readFileSync('./database.csv', 'utf-8');
  const lines = csv.split('\n');
  const users = lines.slice(1).map(extractUser);
  return {
    headers: lines[0], 
    users: users
  };
};

writeHashes = (headers, users) => {
  fs.writeFileSync('./hash_database.csv', headers);
  users.forEach(user => {
    fs.appendFileSync('./hash_database.csv', `\n${user.id}, ${user.name}, ${user.hash}, ${user.consent}`);
  });
}

const { headers, users } = readCsv();
writeHashes(headers, users);

exports.extractUser = extractUser;
exports.readCsv = readCsv;
exports.writeHashes = writeHashes;
