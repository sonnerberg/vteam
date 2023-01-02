const supertest = require('supertest');
const app = require('../app');
const { closePool } = require('../database/mariadb');

const api = supertest(app);

let token;
let newAdminToken;
const bikesUser = {
    email: 'bikes@test.com',
    password: 'password',
};

const bikeThatDoesExist = {
    username: '1',
    id: 1,
};

const bikeThatDoesNotExist = {
    username: '2',
    id: 99999999,
};

const withinPolygon = {
    coordinates: [
        [
            [12.0872345121563, 56.831122755154695],
            [12.0872345121563, 54.9577271273256],
            [15.467501178825358, 54.9577271273256],
            [15.467501178825358, 56.831122755154695],
            [12.0872345121563, 56.831122755154695],
        ],
    ],
    type: 'Polygon',
};

const updatedBike = {
    whole: false,
    battery_warning: false,
    battery_depleted: false,
    rented: false,
    user_id: 123,
    charging: true,
    blocked: true,
    coordinates: [17.12, 60.01],
};

const coordinatesForNewBike = {
    latitude: '855.1',
    longitude: '200.8',
};

const malformedCoordinatesForNewBike = {
    latitude: '855.1',
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

test('register new admin to test bikes router', async () => {
    await api
        .post('/v1/auth/register')
        .set('Authorization', `Bearer ${token}`)
        .send(bikesUser)
        .expect(200);
});

test('new admin can log in', async () => {
    const result = await api
        .post('/v1/auth/login')
        .send(bikesUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    newAdminToken = JSON.parse(result.text).data.token;
});

test('cannot get bikes when not authorized', async () => {
    await api.get('/v1/bikes').expect(401);
});

test('can get bikes when authorized', async () => {
    await api
        .get('/v1/bikes')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .expect(200);
});

test('cannot get bikes when not authorized', async () => {
    await api.get('/v1/bikes/sonnerberg').expect(401);
});

test('cannot get bike that does not exist when authorized', async () => {
    await api
        .get('/v1/bikes/asdf')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .expect(400);
});

test('can get bike when authorized', async () => {
    await api
        .get('/v1/bikes/1')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .expect(200);
});

test('can get bikes within when authorized', async () => {
    await api
        .post('/v1/bikes/within')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .send(withinPolygon)
        .expect(200);
});

test('cannot create new bike with malformed position when authorized', async () => {
    await api
        .post('/v1/bikes/new')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .send(coordinatesForNewBike)
        .expect(200);
});

test('can create new bike when authorized', async () => {
    await api
        .post('/v1/bikes/new')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .send(malformedCoordinatesForNewBike)
        .expect(200);
});

test('cannot update bike that does not exist when authorized', async () => {
    await api
        .put('/v1/bikes/wqwertyuiooewqriuyewroiwqye1231432')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .send(updatedBike)
        .expect(404);
});

test('can update bike when authorized', async () => {
    await api
        .put('/v1/bikes/1')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .send(updatedBike)
        .expect(200);
});

test('can rent bike that exists with user that exists when authorized', async () => {
    await api
        .post('/v1/bikes/rent')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .send(bikeThatDoesExist)
        .expect(200);
});

test('can get all bikes  when authorized', async () => {
    await api
        .get('/v1/bikes')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .expect(200);
});

test('can return bike that exists with user that exists when authorized', async () => {
    await api
        .post('/v1/bikes/return')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .send(bikeThatDoesExist)
        .expect(200);
});

test('cannot return bike that exists with user that exists again when authorized', async () => {
    await api
        .post('/v1/bikes/return')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .send(bikeThatDoesExist)
        .expect(204);
});

test('cannot rent bike that does not exist when authorized', async () => {
    await api
        .post('/v1/bikes/rent')
        .set('Authorization', `Bearer ${newAdminToken}`)
        .send(bikeThatDoesNotExist)
        .expect(400);
});

afterAll(() => {
    closePool();
});
