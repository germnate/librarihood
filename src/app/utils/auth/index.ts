import { hashSync } from 'bcrypt-ts/node'

function hashPassword(password: string): string {
  return hashSync(password, 10)
}

export { hashPassword }