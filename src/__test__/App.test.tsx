import React from 'react';
import { render } from '@testing-library/react';
import Home from '../containers/ExchangeRateTable';

describe('index', () => {
  it('Should render Home', () => {
    render(
      <React.StrictMode>
        <Home />
      </React.StrictMode>
    );
  });
});