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
        .get('/v1/bikes')
        .set('x-access-token', 'notvalid')
        .expect(401)
        .expect('Content-Type', /application\/json/);
});

test('get all available bikes', async () => {
    await api
        .get('/v1/bikes')
        .set('x-access-token', token)
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('rent a bike', async () => {
    await api
        .post('/v1/bikes/rent')
        .set('x-access-token', token)
        .send({
            username: loginInfo.userName,
            id: 1,
        })
        .expect(200);
});

test('rent a bike that is already rented', async () => {
    await api
        .post('/v1/bikes/rent')
        .set('x-access-token', token)
        .send({
            username: loginInfo.userName,
            id: 1,
        })
        .expect(400);
});

test('return a rented bike', async () => {
    await api
        .post('/v1/bikes/return')
        .set('x-access-token', token)
        .send({
            username: loginInfo.userName,
        })
        .expect(200);
});

afterAll(() => {
    closePool();
});
