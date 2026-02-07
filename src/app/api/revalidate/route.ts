import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret');

    // Usamos el secret de Payload para proteger la ruta
    if (secret !== process.env.PAYLOAD_SECRET) {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const path = request.nextUrl.searchParams.get('path') || '/';

    try {
        revalidatePath(path);
        return NextResponse.json({
            revalidated: true,
            path,
            now: Date.now()
        });
    } catch (err) {
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}
