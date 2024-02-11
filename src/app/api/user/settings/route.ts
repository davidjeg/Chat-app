import { NextResponse, NextRequest } from 'next/server';
import { getCurrentUser } from '@/app/utils/getCurrentUser';
import prisma from '@/app/utils/prismaClient';
export async function PATCH(req: NextRequest) {
    const body = await req.json();
    const user = await getCurrentUser();
    await prisma.user.update({
        where: { phone: user?.phone },
        data: { ...body },
    });

    return NextResponse.json('', { status: 200 });
}
