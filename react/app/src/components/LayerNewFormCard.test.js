import { render, screen } from '@testing-library/react';
import LayerNewFormCard from './LayerNewFormCard';

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
