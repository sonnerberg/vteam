const supertest = require('supertest');
const app = require('../app');
const { closePool } = require('../database/mariadb');

const api = supertest(app);

let token;

const newUser = {
    surName: 'Hello',
    lastName: 'World',
    adress: 'Home',
    billingAdress: 'Away',
    userName: 'test',
    password: 'pass',
    email: 'hello@world.com',
};

const loginInfo = {
    userName: 'test',
    password: 'pass',
};

test('create new user', async () => {
    await api
        .post('/auth/register')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('login with new user and get token', async () => {
    const result = await api
        .post('/auth/login')
        .send(loginInfo)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    token = JSON.parse(result.text).data.token;
});

test('get info of logged in user', async () => {
    await api
        .post('/v1/user')
        .set('x-access-token', token)
        .send({
            userName: newUser.userName,
        })
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('update userinfo with missing fields', async () => {
    await api
        .put('/v1/user/update')
        .set('x-access-token', token)
        .send({
            userName: newUser.userName,
            surName: 'goodbye',
            lastName: 'World',
            adress: 'Home',
            billingAdress: 'Away',
            email: 'hello@world.com',
        })
        .expect(201)
        .expect('Content-Type', /application\/json/);
});

test('update userinfo with correct fields', async () => {
    await api
        .put('/v1/user/update')
        .set('x-access-token', token)
        .send({
            userName: newUser.userName,
        })
        .expect(400)
        .expect('Content-Type', /application\/json/);
});

test('401 if token is not valid', async () => {
    await api
        .post('/v1/user')
        .set('x-access-token', 'nih')
        .send({
            userName: newUser.userName,
        })
        .expect(401)
        .expect('Content-Type', /application\/json/);
});

afterAll(() => {
    closePool();
});
