import prisma from '@/app/utils/prismaClient';
import { getCurrentUser } from '@/app/utils/getCurrentUser';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const user = await getCurrentUser();

    const friendUser = await prisma.user.findUnique({
        where: {
            email: '123@gmail.com',
        },
        include: {
            friends: true,
        },
    });

    return NextResponse.json(friendUser, { status: 200 });
}
