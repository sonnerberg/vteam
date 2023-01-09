import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import SearchChargingForm from './SearchChargingForm';
import getFeatures from '../models/getFeatures';

test('renders form', async () => {
    const setOpenSearchForm = jest.fn();
    const openSearchForm = true;
    const token = '1';
    const mapRef = {};

    render(
        <SearchChargingForm
            openSearchForm={openSearchForm}
            setOpenSearchForm={setOpenSearchForm}
            token={token}
            mapRef={mapRef}
        />
    );
    const form = await screen.findByText(/Skriv ID /i);
    expect(form).toBeInTheDocument();
});

test('searching calls the right function', async () => {
    const setOpenSearchForm = jest.fn();
    const openSearchForm = true;
    const token = '1';
    const mapRef = {
        current: {
            setView: jest.fn(),
        },
    };
    getFeatures.getChargingStationById = jest.fn().mockReturnValue([
        {
            position: {
                geometry: {
                    coordinates: [
                        [16, 59],
                        [16, 59],
                    ],
                },
            },
        },
    ]);

    render(
        <SearchChargingForm
            openSearchForm={openSearchForm}
            setOpenSearchForm={setOpenSearchForm}
            token={token}
            mapRef={mapRef}
        />
    );
    const formField = await screen.findByLabelText('Id på laddstation');
    const user = userEvent.setup();
    expect(formField).toBeInTheDocument();
    await user.type(formField, '1');
    const button = await screen.findByText('Sök');
    await user.click(button);
    expect(getFeatures.getChargingStationById).toHaveBeenCalledTimes(1);
});
