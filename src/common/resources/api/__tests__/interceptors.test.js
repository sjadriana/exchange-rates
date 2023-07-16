import { onResponseError } from '../interceptors'
import i18n from 'common/i18n'

const mockBaap = {
  login: jest.fn(),
}
jest.mock('common/utils/auth', () => ({
  sso: {
    login: () => mockBaap.login(),
  },
}))

describe('interceptros', () => {
  afterEach(() => {
    mockBaap.login.mockClear()
  })

  test('should get default error message', async () => {
    try {
      const value = await onResponseError({})
      expect(value).toBeNull()
    } catch (e) {
      expect(e.message).toBe(i18n.t('general.genericError'))
    }
  })

  test('should get error message', async () => {
    const errorMessage = 'TestError'
    try {
      const error = {
        response: {
          data: {
            userMessage: errorMessage,
          },
        },
      }
      const value = await onResponseError(error)
      expect(value).toBeNull()
    } catch (e) {
      expect(e.message).toBe(errorMessage)
    }
  })

  test('should get server error message', async () => {
    try {
      const error = {
        response: {
          status: 502,
        },
      }
      const value = await onResponseError(error)
      expect(value).toBeNull()
    } catch (e) {
      expect(e.message).toBe(i18n.t('general.serverError'))
    }
  })
})
