import axios from 'axios'
import api from '../exchange-rate-api'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('base', () => {
  test('should create base api', async () => {
    mockedAxios.request.mockResolvedValue('test')

    jest.spyOn(axios, 'create').mockReturnValue(mockedAxios)
    const params = {
      page: 0,
      page_size: 10,
    }

    await api('http://test.com').request({ params }).then(data => expect(data).toEqual('test'))
  })
})
