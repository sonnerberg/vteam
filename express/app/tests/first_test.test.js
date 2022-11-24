const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('there is a 200 response', async () => {
    await api.get('/').expect(200);
    // .expect('Content-Type', /application\/json/)
});
