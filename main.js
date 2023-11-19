const fs = require('node:fs');
const { createHash } = require('node:crypto');

const extractUser = line => {
  const lineArray = line.split(/\s*,\s*/);
  const user = {
    id: lineArray[0],
    name: lineArray[1],
    password: lineArray[2],
    consent: lineArray[3],
    hash() {
      const hash = createHash('sha256');
      return hash.update(this.password).digest('hex');
    },
  }
  return user;
};

const readCsv = () => {
  const csv = fs.readFileSync('./database.csv', 'utf-8');
  const lines = csv.split('\n');
  const users = lines.slice(1).map(extractUser);
  return {
    headers: lines[0],
    users: users
  };
};

const writeWithHashes = (headers, users) => {
  fs.writeFileSync('./filtered_database.csv', headers);
  users.forEach(user => {
    fs.appendFileSync('./filtered_database.csv', `\n${user.id}, ${user.name}, ${user.hash()}, ${user.consent}`);
  });
}

const cleanData = users => {
  return users.filter(user => user.consent !== '-' && user.name !== '-')
    .map((user, id) => {
      user.id = `${id + 1}`;
      return user;
    });
}

let { headers, users } = readCsv();
users = cleanData(users);
writeWithHashes(headers, users);

exports.extractUser = extractUser;
exports.readCsv = readCsv;
exports.writeHashes = writeWithHashes;
exports.cleanData = cleanData;
