import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getAuthenticUser } from '../../../lib/user'
import { User } from '../../../types/user'
import type { SessionUser } from '@/app/types/session-user'

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
        const user: User | null = await getAuthenticUser(credentials?.username || '', credentials?.password || '')
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      const user: SessionUser = session?.user || {}
      user.id = token.id as string
      return session;
    }
  }
}