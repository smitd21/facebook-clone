import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  //database: process.env.DATABASE_URL,
});

// FACEBOOK_CLIENT_ID=1180950958999869
// FACEBOOK_CLIENT_SECRET=57d7ed70c6837c6449f2f5e774bec019
// NEXTAUTH_URL=http://localhost:3000
