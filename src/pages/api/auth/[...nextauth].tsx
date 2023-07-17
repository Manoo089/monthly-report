import NextAuth, { Awaitable, NextAuthOptions, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectToDatabase } from "../../../lib/db";
import { findEmailCredentials, verifyPassword } from "../../../lib/auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  secret: "asd",
  providers: [
    CredentialsProvider({
      name: "credentials",
      authorize: async credentials => {
        const client = await connectToDatabase();
        const user = await findEmailCredentials(credentials, client);

        if (!user) {
          client.end();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(credentials!.password, user.password);

        if (!isValid) {
          client.end();
          throw new Error("Could not log you in!");
        }

        client.end();
        return { email: user.email } as Awaitable<User>;
      },
      credentials: {
        email: {},
        password: {}
      }
    })
  ]
};

export default NextAuth(authOptions);
