import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import { Connect } from "./DB/Coonnect"
import User from "./DB/Schema/UserSchema"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers:
        [
            Credentials({
                credentials: {
                    email: {},
                    password: {},
                },
                authorize: async (credentials) => {
                    const email = credentials.email as string
                    const password = credentials.password as string

                    await Connect();

                    const user = await User.findOne({ email })

                    if (!user) {
                        throw new CredentialsSignin('You are not registered')
                    }

                    const isMatch = await bcrypt.compare(password, user.password);

                    if (user && !isMatch) {
                        throw new CredentialsSignin('Please write correct password')
                    }

                    // if (!user.verified) {
                    //     throw new CredentialsSignin('Please verify your email first')
                    // }
                    return user;
                }
            })
        ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string;
                token.email = user.email as string;
                token.name = (user as any).fullName;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
        error: '/error',
    }
})



