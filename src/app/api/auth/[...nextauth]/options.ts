import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getAuthenticUser } from '../../../lib/user'
import { User } from '../../../types/user'
import { hashPassword } from '@/app/utils/auth'

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "Username"
        },
        password: {
          label: 'Password',
          type: 'password',
        }
      },
      async authorize(credentials) {
        const password = hashPassword(credentials?.password || '')
        const user: User | null = await getAuthenticUser(credentials?.username || '', password || '')
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ]
}