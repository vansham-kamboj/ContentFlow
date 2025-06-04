
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { findUserByGoogleId, createUserInNotion, type NotionUser } from '@/lib/notion';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error("ERROR: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variables are not set.");
  // Optionally throw an error during build or startup if preferred
  // throw new Error("Missing Google OAuth credentials in environment variables.");
}
if (!process.env.NEXTAUTH_SECRET) {
  console.error("ERROR: NEXTAUTH_SECRET environment variable is not set.");
  // throw new Error("Missing NEXTAUTH_SECRET in environment variables.");
}


const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async signIn({ user, account, profile }: { user: any, account: any, profile: any }) {
      if (account?.provider === 'google' && profile?.email) {
        try {
          let notionUser = await findUserByGoogleId(profile.sub); // profile.sub is Google's unique ID for the user
          
          if (!notionUser) {
            notionUser = await createUserInNotion({
              name: profile.name || profile.email.split('@')[0], // Use name, fallback to part of email
              email: profile.email,
              googleId: profile.sub,
              avatarUrl: profile.picture,
            });
          }
          
          if (notionUser) {
            user.id = notionUser.id; // Add Notion Page ID to the user object for JWT/session
            user.notionId = notionUser.id;
            user.googleId = notionUser.googleId;
            return true;
          } else {
            console.error("Failed to find or create user in Notion during sign-in.");
            return false; // Prevent sign-in if Notion interaction fails
          }
        } catch (error) {
          console.error('Error during Notion user check/creation:', error);
          return false; // Prevent sign-in on error
        }
      }
      return true; // Allow sign-in for other cases or if already processed
    },
    async jwt({ token, user, account }: { token: any, user: any, account: any }) {
      // Persist the Notion user ID and Google ID to the token
      if (user?.notionId) {
        token.notionId = user.notionId;
      }
      if (user?.googleId){
         token.googleId = user.googleId;
      }
       if (account?.provider === "google" && user?.image) {
        token.picture = user.image; // Ensure picture from Google profile is in token
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (token?.notionId) {
        session.user.notionId = token.notionId;
      }
       if (token?.googleId) {
        session.user.googleId = token.googleId;
      }
      if (token?.picture) {
        session.user.image = token.picture; // Ensure picture from token is in session
      }
      return session;
    },
  },
  pages: {
    // signIn: '/auth/signin', // Example: Custom sign-in page
    // error: '/auth/error', // Example: Custom error page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
