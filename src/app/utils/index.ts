import type { SignUpErrorDetails } from '../types/signup-errors'

function getDetailedError(data: SignUpErrorDetails): Array<Array<string>> | null {
  if (!data) return null;
  return Object.keys(data).map(key => [key, data[key].message])
}

function fetchUtil({ url, body, method = 'POST' }: { url: string, body: object, method?: string }) {
  return fetch(url, {
    method,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

function setFormData(formData: FormData, params: any) {
  Object.keys(params).forEach(key => formData.append(key, params[key]))
}

export { getDetailedError, fetchUtil, setFormData }