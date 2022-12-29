import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import App from './App';
import postUsers from './models/postUsers';
import getUserData from './models/getUserData';
import getCustomerData from './models/getCustomerData';
import getFeatures from './models/getFeatures';
import postFeatures from './models/postFeatures';
import deleteFeatures from './models/deleteFeatures';
import putFeatures from './models/putFeatures';

const cities = [
    {
        id: 1,
        position: {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [16.520348, 59.281668],
                        [16.54541, 59.235689],
                        [16.289978, 59.235689],
                        [16.110077, 59.280616],
                        [15.486603, 59.237796],
                        [14.80957, 59.548241],
                        [15.79422, 59.637211],
                        [16.189728, 59.527354],
                        [16.335297, 59.549633],
                        [16.4246, 59.4128],
                        [16.4747, 59.4308],
                        [16.5876, 59.376],
                        [16.831055, 59.826874],
                        [17.311707, 59.349996],
                        [17.605591, 58.982576],
                        [16.840668, 59.291137],
                        [16.4743, 59.3138],
                        [16.520348, 59.281668],
                    ],
                ],
            },
            properties: {
                id: 1,
                name: 'Eskilstuna5',
                featureType: 'cities',
            },
        },
    },
];

const chargingStations = [
    {
        id: 1,
        position: {
            type: 'Feature',
            properties: {
                id: 1,
                featureType: 'charging-stations',
            },
            geometry: {
                type: 'Point',
                coordinates: [16.5003, 59.605],
            },
        },
    },
];

const bikes = [
    {
        id: 1,
        position: [59.36661, 16.5077],
        status: 'ok',
        health: 'ok',
        rented: 'false',
        speed: 0,
    },
    {
        id: 2,
        position: [59.36, 16.5],
        status: 'ok',
        health: 'ok',
        rented: 'true',
        speed: 15,
    },
];

const users = [
    {
        id: 1,
        surname: 'John',
        lastname: 'Doe',
        address: 'Gymnastikggatan 55 632 20 Eskilstuna',
        'billing-adress': 'Gymnastikggatan 55 632 20 Eskilstuna',
        username: 'john1@somemail.com',
        pass: '',
        email: 'john@somemail.com',
        balance: 1000,
        status: 'online',
    },
];

const admins = [
    {
        email: 'admin@somemail.com',
    },
];

const trips = [
    {
        id: 1,
        startposition: {
            latitude: '59.36000',
            longitude: '16.5000',
        },
        endposition: {
            latitude: '59.35999',
            longitude: '16.4998',
        },
        starttime:
            'Fri Nov 25 2022 12:50:19 GMT+0100 (Central European Standard Time)',
        endtime:
            'Fri Nov 25 2022 14:01:19 GMT+0100 (Central European Standard Time)',
        userid: 1,
        cost: 100,
    },
    {
        id: 2,
        startposition: {
            latitude: '59.36000',
            longitude: '16.5000',
        },
        endposition: {
            latitude: '59.35999',
            longitude: '16.4998',
        },
        starttime:
            'Sat Nov 26 2022 12:50:19 GMT+0100 (Central European Standard Time)',
        endtime:
            'FSatri Nov 26 2022 14:01:19 GMT+0100 (Central European Standard Time)',
        userid: 1,
        cost: 100,
    },
    {
        id: 3,
        startposition: {
            latitude: '59.36000',
            longitude: '16.5000',
        },
        endposition: {
            latitude: '59.35999',
            longitude: '16.4998',
        },
        starttime:
            'Sun Nov 27 2022 12:50:19 GMT+0100 (Central European Standard Time)',
        endtime:
            'Sun Nov 27 2022 14:01:19 GMT+0100 (Central European Standard Time)',
        userid: 1,
        cost: 100,
    },
];

const workshops = [
    {
        id: 1,
        position: {
            latitude: '59.35999',
            longitude: '16.4998',
        },
    },
];

const zones = [
    {
        id: 1,
        position: {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [16.496379, 59.3739],
                        [16.49786, 59.378928],
                        [16.539917, 59.385682],
                        [16.5025, 59.374],
                        [16.5051, 59.3731],
                        [16.5038, 59.3722],
                        [16.5008, 59.3727],
                        [16.496379, 59.3739],
                    ],
                ],
            },
            properties: {
                id: 1,
                type: 'limited speed',
                speedLimit: '30',
                featureType: 'zones',
            },
        },
    },
    {
        id: 2,
        position: {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [16.6025, 59.574],
                        [16.6051, 59.5731],
                        [16.6038, 59.5722],
                        [16.6008, 59.5727],
                        [16.6025, 59.574],
                    ],
                ],
            },
            properties: {
                id: 2,
                type: 'not allowed',
                speedLimit: 0,
                featureType: 'zones',
            },
        },
    },
];

const parkingLots = [
    {
        id: 1,
        position: {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [16.492, 59.3713],
                        [16.4924, 59.3707],
                        [16.4914, 59.3708],
                        [16.4917, 59.3711],
                        [16.492, 59.3713],
                    ],
                ],
            },
            properties: {
                id: 1,
                type: 'parking not allowed',
                featureType: 'parking-lots',
            },
        },
    },
];

const points = [
    {
        type: 'Feature',
        properties: {
            id: 0,
            featureType: 'points',
        },
        geometry: {
            type: 'Point',
            coordinates: [16.371662891697607, 59.40388342350176],
        },
    },
    {
        type: 'Feature',
        properties: {
            id: 1,
            featureType: 'points',
        },
        geometry: {
            type: 'Point',
            coordinates: [16.421932290387552, 59.33861036474191],
        },
    },
];

test('renders text', () => {
    render(<App />);
    const textElement = screen.getByText(/Lösenord/i);
    expect(textElement).toBeInTheDocument();
});

test('login', async () => {
    postUsers.logInAdmin = jest
        .fn()
        .mockReturnValue({ data: { token: '1', email: 'test@test.se' } });

    render(<App />);

    const logInButton = screen.getByText('Logga in');
    const user = userEvent.setup();

    await user.click(logInButton);

    const cityAccordion = await screen.findByText('Städer');
    expect(cityAccordion).toBeInTheDocument();
});
