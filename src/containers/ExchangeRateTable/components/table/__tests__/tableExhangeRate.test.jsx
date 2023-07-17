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
            time_last_update_utc: "2023-07-12",
            time_last_update_unix: 1626422400,
            conversion_rates: {
                USD: 1.23,
                EUR: 0.92,
                GBP: 0.81,
            },
        };

        axios.get.mockResolvedValue({ data: mockData });

        render(<TableExhangeRate />);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                'https://v6.exchangerate-api.com/v6/8b51c6e461529c9fcff3b0ef/latest/BRL'
            );

        });
        await waitFor(() => {
            expect(screen.getByText('USD')).toBeInTheDocument();

        });

    });

});
