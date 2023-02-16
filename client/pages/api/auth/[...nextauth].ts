import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios, { AxiosResponse } from 'axios'

interface AuthResponse {
  user: {
    _id: string
    name: string
    email: string
    role: number
  }
  token: string
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'text' },
      },
      async authorize(credentials) {
        const user: AxiosResponse<AuthResponse> = await axios.post(
          `${process.env.API}/api/signin`,
          { email: credentials?.email, password: credentials?.password }
        )

        if (user.status === 200) {
          return {
            id: user.data.user._id,
            name: user.data.user.name,
            email: user.data.user.email,
            user_type: user.data.user.role === 0 ? 'CUSTOMER' : 'ADMIN',
            token: user.data.token,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          user_type: user.user_type,
          token: user.token,
        }
      }

      return token
    },
    async session({ session, token, user }: any) {
      session.token = token.token

      if (user) {
        session.user = {
          ...user,
          id: token.id,
          name: token.name,
          email: token.email,
          user_type: token.user_type,
        }
      } else {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          user_type: token.user_type,
        }
      }

      return session
    },
  },
  debug: true,
} as NextAuthOptions

export default NextAuth(authOptions)
