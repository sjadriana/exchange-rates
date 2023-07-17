import React from 'react';
import { render } from '@testing-library/react';
import Home from '../containers/ExchangeRateTable';

describe('index', () => {
  it('deve renderizar o componente App sem erros', () => {
    render(
      <React.StrictMode>
        <Home />
      </React.StrictMode>
    );
    // Se não houver erros ao renderizar, considera-se o teste bem-sucedido
  });
});