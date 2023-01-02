const supertest = require('supertest');
const app = require('../app');
const { closePool } = require('../database/mariadb');

const api = supertest(app);

let token;

const loginInfo = {
    userName: 'test',
    password: 'pass',
};

test('login with new user and get token', async () => {
    const result = await api
        .post('/auth/login')
        .send(loginInfo)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    token = JSON.parse(result.text).data.token;
});

test('401 if token is not valid', async () => {
    await api
        .post('/v1/zones')
        .set('x-access-token', 'notvalid')
        .expect(401)
        .expect('Content-Type', /application\/json/);
});

test('get all zones', async () => {
    await api
        .get('/v1/zones')
        .set('x-access-token', token)
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('get all cities', async () => {
    await api
        .get('/v1/cities')
        .set('x-access-token', token)
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('get all parking-zones', async () => {
    await api
        .get('/v1/parking')
        .set('x-access-token', token)
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('get all charging-zones', async () => {
    await api
        .get('/v1/chargers')
        .set('x-access-token', token)
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

afterAll(() => {
    closePool();
});
