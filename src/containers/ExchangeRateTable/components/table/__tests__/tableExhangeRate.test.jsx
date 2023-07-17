import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import TableExhangeRate from '..';

jest.mock('axios');

describe('TableExhangeRate', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('deve exibir corretamente o componente DataGrid', async () => {
        render(<TableExhangeRate />);

        await waitFor(() => {
            const dataGridElement = screen.getByRole('grid');
            expect(dataGridElement).toBeInTheDocument();
        });
    });

    it('deve buscar os dados da API e exibir as linhas corretamente', async () => {
        const mockData = {
            rates: {
                USD: 1.23,
                EUR: 0.92,
                GBP: 0.81,
            },
            timestamp: 1626422400,
        };

        axios.get.mockResolvedValue({ data: mockData });

        render(<TableExhangeRate />);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                'https://mocki.io/v1/e57779a0-8c69-4b94-8b86-9f065869f289'
            );

        });
        await waitFor(() => {

            expect(screen.getByText('USD')).toBeInTheDocument();

        });

    });

});
