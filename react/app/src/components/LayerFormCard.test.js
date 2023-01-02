import { render, screen } from '@testing-library/react';
import LayerFormCard from './LayerFormCard';
import putFeatures from '../models/putFeatures';
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
