const supertest = require('supertest');
const app = require('../app');
const { closePool } = require('../database/mariadb');

const api = supertest(app);

let token;
let newAdminToken;
const customerUser = {
    email: 'customer@test.com',
    password: 'password',
};

const updatedUser = {
    surname: 'Hello',
    lastname: 'World',
    adress: 'Kustvägen 10',
    billing_adress: 'Kustvägen 10',
    balance: 500,
    status: 'online',
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

test('register new admin to test customer router', async () => {
    await api
        .post('/v1/auth/register')
        .set('Authorization', `Bearer ${token}`)
        .send(customerUser)
        .expect(200);
});

test('new admin can log in', async () => {
    const result = await api
        .post('/v1/auth/login')
        .send(customerUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    newAdminToken = JSON.parse(result.text).data.token;
});

test('cannot get customer when not authorized', async () => {
    await api.get('/v1/customer').expect(401);
});

test('can get customer when authorized', async () => {
    await api
        .get('/v1/customer')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .expect(200);
});

test('cannot get customer when not authorized', async () => {
    await api.get('/v1/customer/sonnerberg').expect(401);
});

test('can get customer when authorized', async () => {
    await api
        .get('/v1/customer/sonnerberg')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .expect(200);
});

test('can update customer when authorized', async () => {
    await api
        .put('/v1/customer/sonnerberg')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .send(updatedUser)
        .expect(200);
});

test('cannot update customer that does not exist when authorized', async () => {
    await api
        .put('/v1/customer/qwertyuioasdfghjkl0987654321')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .send(updatedUser)
        .expect(404);
});

afterAll(() => {
    closePool();
});
