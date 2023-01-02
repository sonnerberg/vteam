import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import AppUser from './App_user';
import getUserData from './models/getUserData';
import getCustomerData from './models/getCustomerData';
import postUsers from './models/postUsers';
import putUsers from './models/putUsers';

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

    {
        id: 2,
        surname: 'Jane',
        lastname: 'Doe',
        address: 'Gymnastikgatan 55 632 20 Eskilstuna',
        'billing-adress': 'Gymnastikgatan 55 632 20 Eskilstuna',
        username: 'jane1@somemail.com',
        pass: '',
        email: 'jane@somemail.com',
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
    render(<AppUser token={token} />);
    const listItem = await screen.findByText(/john1@somemail.com/i);
    expect(listItem).toBeInTheDocument();
});

test('Clicking username renders card with info', async () => {
    getUserData.getUsers = jest.fn().mockReturnValue(users);
    getUserData.getAdmins = jest.fn().mockReturnValue(admins);
    getCustomerData.getTripsByUserName = jest.fn().mockReturnValue(trips);
    render(<AppUser token={token} />);
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
/*
test('Searching for user displays only that user', async () => {
    getUserData.getUsers = jest.fn().mockReturnValue(users);
    getUserData.getAdmins = jest.fn().mockReturnValue(admins);
    getCustomerData.getTripsByUserName = jest.fn().mockReturnValue(trips);

    render(<App_user token={token} />);

    const listItem = await screen.findByText(/john1@somemail.com/i);

    const search = await screen.findByLabelText('Sök användare');
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
}); */

test('Clicking change renders form', async () => {
    getUserData.getUsers = jest.fn().mockReturnValue(users);
    getUserData.getAdmins = jest.fn().mockReturnValue(admins);
    getCustomerData.getTripsByUserName = jest.fn().mockReturnValue(trips);
    render(<AppUser token={token} />);
    const listItem = await screen.findByText(/john1@somemail.com/i);
    const user = userEvent.setup();
    await user.click(listItem);
    const changeButton = await screen.findByText('Ändra');
    await user.click(changeButton);
    const cancelButton = await screen.findByText('Avbryt');
    const saveButton = await screen.findByText('Spara');
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
});

test('Saving user form calls the model', async () => {
    getUserData.getUsers = jest.fn().mockReturnValue(users);
    getUserData.getAdmins = jest.fn().mockReturnValue(admins);
    getCustomerData.getTripsByUserName = jest.fn().mockReturnValue(trips);
    putUsers.putUser = jest.fn();
    render(<AppUser token={token} />);
    const listItem = await screen.findByText(/john1@somemail.com/i);
    const user = userEvent.setup();
    await user.click(listItem);
    const changeButton = await screen.findByText('Ändra');
    await user.click(changeButton);
    const saveButton = await screen.findByText('Spara');
    await user.click(saveButton);

    expect(putUsers.putUser).toHaveBeenCalledTimes(1);
});

test('Searching for user displays user', async () => {
    getUserData.getUsers = jest.fn().mockReturnValue(users);
    getUserData.getAdmins = jest.fn().mockReturnValue(admins);
    getCustomerData.getTripsByUserName = jest.fn().mockReturnValue(trips);
    putUsers.putUser = jest.fn();

    render(<AppUser token={token} />);

    await screen.findByText(/jane1@somemail.com/i);
    const user = userEvent.setup();
    const search = await screen.findByLabelText('Sök användare');
    await user.type(search, 'jane');

    const name2 = await screen.findByText(/jane1@somemail.com/i);
    expect(name2).toBeInTheDocument();
    const listItem = screen.queryByText(/john1@somemail.com/i);
    expect(listItem).toBe(null);
});

test('Clicking switch renders new label', async () => {
    getUserData.getUsers = jest.fn().mockReturnValue(Promise.resolve(users));
    getUserData.getAdmins = jest.fn().mockReturnValue(Promise.resolve(admins));
    render(<AppUser token={token} />);
    await screen.findByText(/john1@somemail.com/i);
    const userSwitch = await screen.findByText('Växla till administratörer');
    const user = userEvent.setup();
    await user.click(userSwitch);
    const newLabel = await screen.findByText('Växla till kunder');
    expect(newLabel).toBeInTheDocument();
});

test('Clicking new admin renders form', async () => {
    getUserData.getUsers = jest.fn().mockReturnValue(Promise.resolve(users));
    getUserData.getAdmins = jest.fn().mockReturnValue(Promise.resolve(admins));
    render(<AppUser token={token} />);
    await screen.findByText(/john1@somemail.com/i);
    const userSwitch = await screen.findByText('Växla till administratörer');
    const user = userEvent.setup();
    await user.click(userSwitch);
    const button = await screen.findByText('Ny');
    await user.click(button);
    const form = await screen.findAllByText(/email/i);

    expect(form[0]).toBeInTheDocument();
});

test('Creating new admin calls the model', async () => {
    getUserData.getUsers = jest.fn().mockReturnValue(Promise.resolve(users));
    getUserData.getAdmins = jest.fn().mockReturnValue(Promise.resolve(admins));
    postUsers.registerAdmin = jest.fn();
    render(<AppUser token={token} />);
    await screen.findByText(/john1@somemail.com/i);
    const userSwitch = await screen.findByText('Växla till administratörer');
    const user = userEvent.setup();
    await user.click(userSwitch);
    const button = await screen.findByText('Ny');
    await user.click(button);
    const form1 = await screen.findByLabelText(/email/i);
    const form2 = await screen.findByLabelText(/password/i);
    await user.type(form1, 'admin2@example.com');
    await user.type(form2, '12345678');
    const save = await screen.findByText('Spara');
    await user.click(save);

    expect(postUsers.registerAdmin).toHaveBeenCalledTimes(1);
    //screen.debug(null, 20000);
});
