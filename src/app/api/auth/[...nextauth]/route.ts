import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/app/utils/prismaClient';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'string' },
                password: { label: 'Password', type: 'password' },
                phone: { label: 'phone', type: 'text' },
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error('no credentials');
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error('error');
                }

                return user;
            },
        }),
    ],
    pages: { signIn: '/auth/login' },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
