import { Experimental_CssVarsProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import App_user from './App_user';
import getUserData from './models/getUserData';
import getCustomerData from './models/getCustomerData';

const filteredData = {
    customerUserData: [
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
    ],
    adminUserData: [
        {
            email: 'admin@example.com',
        },
    ],
};

const users = [
    {
        id: 1,
        surname: 'John',
        lastname: 'Doe',
        address: 'Gymnastikgatan 55 632 20 Eskilstuna',
        'billing-adress': 'Gymnastikgatan 55 632 20 Eskilstuna',
        username: 'john1@somemail.com',
        pass: '',
        email: 'john@somemail.com',
        balance: 1000,
        status: 'online',
    },
];

const admins = [
    {
        email: 'admin@example.com',
    },
];

const trips = [
    {
        id: 1,
        startposition: {
            type: 'Point',
            coordinates: [16.5, 59.36],
        },
        endposition: {
            type: 'Point',
            coordinates: [16.4998, 59.35999],
        },
        starttime: '2022-12-25T12:50:19.000Z',
        endtime: '2022-12-25T14:01:19.000Z',
        username: 'john1@somemail.com',
        cost: 100,
    },
];

const token = '1';

test('App_user renders list of usernames', async () => {
    getUserData.getUsers = jest.fn().mockReturnValue(Promise.resolve(users));
    getUserData.getAdmins = jest.fn().mockReturnValue(Promise.resolve(admins));
    render(<App_user token={token} />);
    const listItem = await screen.findByText(/john1@somemail.com/i);
    expect(listItem).toBeInTheDocument();
});

test('Clicking username renders card with info', async () => {
    getUserData.getUsers = jest.fn().mockReturnValue(Promise.resolve(users));
    getUserData.getAdmins = jest.fn().mockReturnValue(Promise.resolve(admins));
    getCustomerData.getTripsByUserName = jest.fn().mockReturnValue(trips);
    render(<App_user token={token} />);
    const listItem = await screen.findByText(/john1@somemail.com/i);

    const user = userEvent.setup();

    await user.click(listItem);

    const surname = await screen.findByText('John');
    const lastname = await screen.findByText('Doe');
    const adresses = await screen.findAllByText(/Gymnastikgatan/i);
    const usernames = await screen.findAllByText(/john1@somemail.com/i);
    const email = await screen.findAllByText(/john1@somemail.com/i);
    const balance = await screen.findByText('1000');

    expect(surname).toBeInTheDocument();
    expect(lastname).toBeInTheDocument();
    expect(adresses[0]).toBeInTheDocument();
    expect(usernames[0]).toBeInTheDocument();
    expect(email[0]).toBeInTheDocument();
    expect(balance).toBeInTheDocument();

    //screen.debug(null, 20000);
});

test('Clicking switch renders new label', async () => {
    getUserData.getUsers = jest.fn().mockReturnValue(Promise.resolve(users));
    getUserData.getAdmins = jest.fn().mockReturnValue(Promise.resolve(admins));
    getCustomerData.getTripsByUserName = jest.fn().mockReturnValue(trips);
    render(<App_user token={token} />);

    const userSwitch = await screen.findByLabelText(
        'Växla till administratörer'
    );

    const user = userEvent.setup();

    await user.click(userSwitch);

    const newLabel = await screen.findByLabelText('Växla till kunder');

    expect(newLabel).toBeInTheDocument();
    //screen.debug(null, 20000);
});
