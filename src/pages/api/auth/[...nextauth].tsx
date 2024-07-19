import { User } from '@models/user'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        ;(session.user as User).id = token.sub as string
      }

      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
})
