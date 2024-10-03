import type { SignUpErrorDetails } from '../types/signup-errors'

function getDetailedError(data: SignUpErrorDetails): Array<Array<string>> {
  return Object.keys(data).map(key => [key, data[key].message])
}

export { getDetailedError }