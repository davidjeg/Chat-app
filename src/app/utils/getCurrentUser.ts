import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import prisma from './prismaClient';

export const getCurrentUser = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { email: session?.user?.email },
    });

    if (!user) {
        return null;
    }
    console.log(user);

    return user;
};
