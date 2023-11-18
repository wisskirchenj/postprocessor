import fs from 'node:fs';
import { createHash } from 'node:crypto';

const extractUser = line => {
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

const csv = fs.readFileSync('./database.csv', 'utf-8');
const lines = csv.split('\n');
const users = lines.slice(1).map(extractUser);

fs.writeFileSync('./hash_database.csv', lines[0]);
users.forEach(user => {
  fs.appendFileSync('./hash_database.csv', `\n${user.id}, ${user.name}, ${user.hash}, ${user.consent}`);
});
