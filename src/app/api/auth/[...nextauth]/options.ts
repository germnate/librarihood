import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getAuthenticUser } from '../../../lib/user'
import { User as pbUser } from '../../../types/user'
import pb from '../../../lib/db'
import { RecordModel } from 'pocketbase'
import { SessionUser } from '@/app/types/session-user'
import { User, Account, Profile } from 'next-auth'

interface Params {
  user: User;
  account: Account | null;
  profile?: Profile | undefined;
  email?: { verificationRequest?: boolean | undefined; } | undefined;
  credentials?: Record<string, unknown> | undefined;
}

async function authorizeCreds(credentials: { username: string; password: string }) {
  const user: pbUser | null = await getAuthenticUser(credentials?.username || '', credentials?.password || '')
  if (user) {
    return user
  } else {
    return null
  }
}

async function checkSignInCredentials(credentials: { username: string; password: string }) {
  const user = await authorizeCreds(credentials)
  return !!user;
}

async function findOrCreate(params: Params) {
  const existingUser: Array<RecordModel> = await pb.collection('users').getFullList({
    filter: `providerId="${params.user.id}"`
  })
  if (existingUser.length) {
    return true;
  } else {
    await pb.collection('users').create({
      email: params.user.email,
      name: params.user.name,
      providerId: params.user.id,
      // the passwords are required to save a user in pocketbase.io
      // However these passwords cannot be used since we first check the provider
      // and in order to enter a password the provider must be "credentials" not "github" or some other provider.
      password: 'temporary',
      passwordConfirm: 'temporary',
    })
    return true;
  }
}

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
        if (!credentials) return null;
        return authorizeCreds(credentials)
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
    },
    async signIn(params: Params) {
      if (params?.account?.provider === 'credentials') {
        if (params?.credentials && typeof params.credentials?.username === 'string' && typeof params.credentials?.password === 'string') {
          const credentials = params.credentials as { username: string; password: string }
          return checkSignInCredentials(credentials)
        }
      }
      if (params?.account?.provider === 'github') {
        return findOrCreate(params)
      }
      return false;
    }
  }
}