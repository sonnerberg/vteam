const supertest = require('supertest');
const app = require('../app');
const { closePool } = require('../database/mariadb');

const api = supertest(app);

let token;
let newAdminToken;
const tripsUser = {
    email: 'trips@test.com',
    password: 'password',
};

test('log in superadmin to get token', async () => {
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

test('register new admin to test trips router', async () => {
    await api
        .post('/v1/auth/register')
        .set('Authorization', `Bearer ${token}`)
        .send(tripsUser)
        .expect(200);
});

test('new admin can log in', async () => {
    const result = await api
        .post('/v1/auth/login')
        .send(tripsUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    newAdminToken = JSON.parse(result.text).data.token;
});

test('cannot get trips when not authorized', async () => {
    await api.get('/v1/trips').expect(401);
});

test('can get trips when authorized', async () => {
    await api
        .get('/v1/trips')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .expect(200);
});

test('cannot get trips for individual user when not authorized', async () => {
    await api.get('/v1/trips/sonnerberg').expect(401);
});

test('can get trips for individual user when authorized', async () => {
    await api
        .get('/v1/trips/sonnerberg')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .expect(200);
});

afterAll(() => {
    closePool();
});
