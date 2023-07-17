import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';


describe('App', () => {
  let div = null
  beforeAll(() => {
    div = document.createElement('div')
    div.id = 'root'
    document.body.appendChild(div)
  })
  it('deve renderizar corretamente', async () => {
    require('../index')

    await render(<App />)
    // eslint-disable-next-line testing-library/no-node-access
    const appElement = document.getElementById('root');
    expect(appElement).toBeInTheDocument();
  });
});
