import nextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../utils/conn";
import User from "../../../models/User.js";
import { compare, hashSync } from "bcryptjs";


export default nextAuth({
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ user, account }) {
            connectMongo();
            if (account.provider === "google") {
                let result = await User.findOne({ email: user.email });
                if (!result) result = await User.create({
                    name: user.name,
                    email: user.email,
                    password: hashSync(user.id),
                    isAdmin: false
                })
                user._id = result._id
            }
            return true
        },
        async jwt({ token, user }) {
            if (user?._id) token._id = user._id;
            if (user?.isAdmin) token.isAdmin = user.isAdmin;
            return token;
        },
        async session({ session, token }) {
            if (token?._id) session.user._id = token._id;
            if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
            return session;
        },
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                connectMongo().catch(error => { error: "Connection Failed...!" })

                // check user existance
                const user = await User.findOne({ email: credentials.email })
                if (!user) {
                    throw new Error("No user Found with Email Please Sign Up...!")
                }

                // compare()
                const checkPassword = await compare(credentials.password, user.password);

                // incorrect password
                if (!checkPassword || user.email !== credentials.email) {
                    throw new Error("Username or Password doesn't match");
                }

                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                };

            }
        })
    ],
})