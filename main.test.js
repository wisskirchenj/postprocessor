const { extractUser, readCsv, cleanData } = require('./main');

test('extractUser correctly extracts user and hashes password', () => {
  const line = '1, John Doe, password123, true';
  const expectedUser = {
    id: '1',
    name: 'John Doe',
    password: 'password123',
    consent: 'true',
  };
  expect(extractUser(line)).toMatchObject(expectedUser); // toMatchObject checks if the object has all the properties and values of the expected object
});

const firstUser = {
  id: '1',
  name: 'Mgkfuaqyw',
  password: 'v3iohwet',
  consent: 'yes',
};

test('readUsers correctly reads users from database.csv', () => {
  const { users } = readCsv();
  expect(users.length).toBe(100);
  expect(users[0]).toMatchObject(firstUser);
  expect(users[0].hash()).toBe('8f9e2d2168b75ca7bdbb46021bf6a234b295d4cd6d8edcc6f747ce146ee69f2a')
});

test('cleanData correctly filters out users with no consent or name', () => {
  const { users } = readCsv();
  const cleanedUsers = cleanData(users);
  expect(cleanedUsers.length).toBe(29);
  expect(cleanedUsers[0]).toMatchObject(firstUser);
  expect(cleanedUsers[0].hash()).toBe('8f9e2d2168b75ca7bdbb46021bf6a234b295d4cd6d8edcc6f747ce146ee69f2a')
});
