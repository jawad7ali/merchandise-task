import { NextAuthOptions, Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import constants from "@/config/constants"
import apiEndpoints from "../../../../config/apiEndpoints";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'username', type: 'text', placeholder: 'username' },
                password: { label: 'password', type: 'password', placeholder: 'Password' }
            },
            async authorize(credentials:any, req): Promise<any> {
                
                const { username, password } = credentials;
                if (!username || !password) {
                    throw new Error('Invalid credentials');
                }
                const { LOGIN } = apiEndpoints;

                const user = await fetch(
                    `${constants.APP_URL}${LOGIN}`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        username,
                        password,
                      }),
                    }
                  );
                const response = await user.json();
                if (!response?.data) {
                  throw new Error(response?.data?.message || 'Invalid credentials');
                }
            return {
                username: username,
                accessToken: response?.data?.accessToken,
            };
        }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login',
    },
    callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token }: { session: Session; token: any }) {
			return { ...session, user: token };
		},
    },
    debug: false,
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}
