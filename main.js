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

readUsers = () => {
  const csv = fs.readFileSync('./database.csv', 'utf-8');
  const lines = csv.split('\n');
  const users = lines.slice(1).map(extractUser);
  return users;
};

writeHashes = () => {
  fs.writeFileSync('./hash_database.csv', lines[0]);
  users.forEach(user => {
    fs.appendFileSync('./hash_database.csv', `\n${user.id}, ${user.name}, ${user.hash}, ${user.consent}`);
  });
}

const users = readUsers();
writeHashes();

exports.extractUser = extractUser;
exports.readUsers = readUsers;
exports.writeHashes = writeHashes;
