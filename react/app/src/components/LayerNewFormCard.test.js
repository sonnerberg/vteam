import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import LayerNewFormCard from './LayerNewFormCard';
import postFeatures from '../models/postFeatures';

test('renders form', async () => {
    const data = {
        position: {
            properties: {
                id: 1,
                name: 'Eskilstuna',
                featureType: 'cities',
            },
        },
    };

    render(<LayerNewFormCard content={data} />);

    // Look for save button which indicates form is rendered
    const save = await screen.findByText('Spara');

    expect(save).toBeInTheDocument();
});

test('calls the right function when save is clicked', async () => {
    const data = {
        position: {
            properties: {
                id: 1,
                name: 'Eskilstuna',
                featureType: 'cities',
            },
        },
    };

    const dad = 'stad';
    const setFormCard = jest.fn();
    const setShowFormCard = jest.fn();
    const setCard = jest.fn();
    const drawnItems = {
        current: {
            toGeoJSON: jest.fn().mockReturnValue({
                features: [{ geometry: {} }],
            }),
            clearLayers: jest.fn(),
        },
    };
    const setTriggerRedraw = jest.fn();
    const token = '1';

    postFeatures.postFeatures = jest.fn();

    render(
        <LayerNewFormCard
            content={data}
            dad={dad}
            setFormCard={setFormCard}
            setShowFormCard={setShowFormCard}
            setCard={setCard}
            drawnItems={drawnItems}
            setTriggerRedraw={setTriggerRedraw}
            token={token}
        />
    );
    const user = userEvent.setup();
    // Look for save button which indicates form is rendered
    const save = await screen.findByText('Spara');
    await user.click(save);
    expect(postFeatures.postFeatures).toHaveBeenCalledTimes(1);
});

test('calls the right function when save is clicked and scooter is dad', async () => {
    const data = {
        position: {
            properties: {
                id: 1,
                name: 'Eskilstuna',
                featureType: 'cities',
            },
        },
    };

    const dad = 'scooter';
    const setFormCard = jest.fn();
    const setShowFormCard = jest.fn();
    const setCard = jest.fn();
    const drawnItems = {
        current: {
            toGeoJSON: jest.fn().mockReturnValue({
                features: [{ geometry: {} }],
            }),
            clearLayers: jest.fn(),
        },
    };
    const setTriggerRedraw = jest.fn();
    const token = '1';

    postFeatures.postBatchOfBikes = jest.fn();

    render(
        <LayerNewFormCard
            content={data}
            dad={dad}
            setFormCard={setFormCard}
            setShowFormCard={setShowFormCard}
            setCard={setCard}
            drawnItems={drawnItems}
            setTriggerRedraw={setTriggerRedraw}
            token={token}
        />
    );
    const user = userEvent.setup();
    // Look for save button which indicates form is rendered
    const save = await screen.findByText('Spara');
    await user.click(save);
    expect(postFeatures.postBatchOfBikes).toHaveBeenCalledTimes(1);
});
