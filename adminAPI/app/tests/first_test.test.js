const supertest = require('supertest');
const app = require('../app');
const { closePool } = require('../database/mariadb');

const api = supertest(app);

let token;
let newAdminToken;

test('unregistered user cannot log in', async () => {
    const user = {
        email: 'email@examples.com',
        password: '12345678',
    };

    await api.post('/v1/auth/login').send(user).expect(401);
});

test('superadmin cannot log in with wrong password', async () => {
    const user = {
        email: 'email@example.com',
        password: '12345678123',
    };

    await api.post('/v1/auth/login').send(user).expect(401);
});

test('superadmin can log in', async () => {
    const user = {
        email: 'email@example.com',
        password: '12345678',
    };

    const result = await api
        .post('/v1/auth/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    token = JSON.parse(result.text).data.token;
});

test('superadmin can register new admin', async () => {
    const user = {
        email: 'test@test.com',
        password: 'password',
    };

    await api
        .post('/v1/auth/register')
        .set('Authorization', `Bearer ${token}`)
        .send(user)
        .expect(200);
});

test('superadmin cannot register new admin with malformed email', async () => {
    const user = {
        email: 'testtest.com',
        password: 'password',
    };

    await api
        .post('/v1/auth/register')
        .set('Authorization', `Bearer ${token}`)
        .send(user)
        .expect(400);
});

test('superadmin cannot register new admin again', async () => {
    const user = {
        email: 'test@test.com',
        password: 'password',
    };

    await api
        .post('/v1/auth/register')
        .set('Authorization', `Bearer ${token}`)
        .send(user)
        .expect(409);
});

test('superadmin cannot register new admin without token', async () => {
    const user = {
        email: 'test@test.com',
        password: 'password',
    };

    await api
        .post('/v1/auth/register')
        .set('Authorization', `Bearer ${token}123`)
        .send(user)
        .expect(401);
});
test('new admin can log in', async () => {
    const user = {
        email: 'test@test.com',
        password: 'password',
    };

    const result = await api
        .post('/v1/auth/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    newAdminToken = JSON.parse(result.text).data.token;
});

test('new admin cannot register another new admin', async () => {
    const user = {
        email: 'test@tests.com',
        password: 'password',
    };

    await api
        .post('/v1/auth/register')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .send(user)
        .expect(401);
});

afterAll(() => {
    closePool();
});
