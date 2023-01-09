import { render, screen } from '@testing-library/react';
import LayerFormCard from './LayerFormCard';
import putFeatures from '../models/putFeatures';
import deleteFeatures from '../models/deleteFeatures';
import userEvent from '@testing-library/user-event/';

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

    render(<LayerFormCard content={data} />);

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

    putFeatures.putFeatures = jest.fn();

    render(
        <LayerFormCard
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
    expect(putFeatures.putFeatures).toHaveBeenCalledTimes(1);
});

test('calls the right function when delete is clicked', async () => {
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

    deleteFeatures.deleteFeatures = jest.fn();

    render(
        <LayerFormCard
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
    const deleteButton = await screen.findByText('Ta bort');
    await user.click(deleteButton);
    expect(deleteFeatures.deleteFeatures).toHaveBeenCalledTimes(1);
});
