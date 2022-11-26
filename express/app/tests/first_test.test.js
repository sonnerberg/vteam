const supertest = require('supertest');
const app = require('../app');
const { closePool } = require('../database/mariadb');

const api = supertest(app);

test('there is a 200 response', async () => {
    await api.get('/').expect(200);
    // .expect('Content-Type', /application\/json/)
});

test('there is a object response from db', async () => {
    const response = await api.get('/mariadb');
    expect(response.body).toHaveLength(5);
    // .expect('Content-Type', /application\/json/)
});

afterAll(() => {
    closePool();
});
