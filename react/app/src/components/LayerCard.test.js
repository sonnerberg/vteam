import { render, screen } from '@testing-library/react';
import LayerCard from './LayerCard';

test('renders text', async () => {
    const data = {
        position: {
            properties: {
                id: 1,
                name: 'Eskilstuna',
                featureType: 'cities',
            },
        },
    };

    render(<LayerCard content={data} />);

    const name = await screen.findByText('Eskilstuna');

    expect(name).toBeInTheDocument();
});
