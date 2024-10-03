import type { SignUpErrorDetails } from '../types/signup-errors'

function getDetailedError(data: SignUpErrorDetails): Array<Array<string>> | null {
  if (!data) return null;
  return Object.keys(data).map(key => [key, data[key].message])
}

export { getDetailedError }