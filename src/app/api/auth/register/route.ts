import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/utils/prismaClient';

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body);

    const user = await prisma.user.create({
        data: {
            ...body,
        },
    });

    return NextResponse.json('registered', {});
}
