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

function validIsbn10(isbn: string) {
  return isbn.match(/^(?:\d{9}X|\d{10})$/)
}

function validIsbn13(isbn: string) {
  return isbn.match(/^(978|979)-?\d{10}$/)
}


export { getDetailedError, fetchUtil, validIsbn10, validIsbn13 }