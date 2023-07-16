import _get from 'lodash/get'
import i18n from '../../i18n'
import { AxiosError } from 'axios'

type Status = number | string

const isServerError = (status: Status) => status >= 500 && status < 600

const handleHttpErrors = (status: Status, defaultMessage: string) => {
  const errorMessage = isServerError(status) ? i18n.t('general.serverError') : defaultMessage
  return Promise.reject(new Error(errorMessage))
}

export const onResponseError = (error: AxiosError) => {
  const status: any = _get(error, 'response.status')
  const message = _get(error, 'response.data.userMessage', i18n.t('general.genericError'))
  return handleHttpErrors(status, message)
}
