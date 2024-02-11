import prisma from '@/app/utils/prismaClient';
import { getCurrentUser } from '@/app/utils/getCurrentUser';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const user = await getCurrentUser();

    const friendUser = await prisma.user.findUnique({
        where: { phone: body },
    });
    console.log(friendUser);

    const newF = await prisma.friend.create({
        data: {
            phone: body,
            user: { connect: { id: user?.id } },
        },
    });

    return NextResponse.json('', { status: 200 });
}
