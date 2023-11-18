const { createHash } = require('crypto');
const { extractUser } = require('./main');

test('extractUser correctly extracts user and hashes password', () => {
  const line = '1, John Doe, password123, true';
  const expectedHash = createHash('sha256').update('password123').digest('hex');
  const expectedUser = {
    id: '1',
    name: 'John Doe',
    password: 'password123',
    consent: 'true',
    hash: expectedHash,
  };
  expect(extractUser(line)).toEqual(expectedUser);
});

const expectedUser = {
  id: '1',
  name: 'Mgkfuaqyw',
  password: 'v3iohwet',
  consent: 'yes',
  hash: '8f9e2d2168b75ca7bdbb46021bf6a234b295d4cd6d8edcc6f747ce146ee69f2a',
};

test('readUsers correctly reads users from database.csv', () => {
  const { readUsers } = require('./main');
  const users = readUsers();
  expect(users.length).toBe(100);
  expect(users[0]).toStrictEqual(expectedUser);
});
