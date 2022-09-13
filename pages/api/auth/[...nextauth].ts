import { dbUsers } from 'database';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '3s-unsecr3to00oo',
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Correo', type: 'email', placeholder: 'correo@example.com' },
        password: {
          label: 'Contraseña',
          type: 'password',
          placeholder: 'Contraseña',
        },
      },
      async authorize(credentials) {
        console.log({ credentials });

        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password,
        );
      },
    }),
  ],

  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },

  session: {
    maxAge: 2592000, // 30d
    strategy: 'jwt',
    updateAge: 86400, // update session after 1d
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(
              user?.email || '',
              user?.name || '',
            );
            break;
          case 'credentials':
            token.user = user;
            break;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    },
  },
});
