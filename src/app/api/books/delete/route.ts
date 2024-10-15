import { deleteBook } from "@/app/lib/books"
import { ServerError, conformsToServerError } from "@/app/types/errors/ServerError"
import { NextRequest, NextResponse } from "next/server"

async function handler(req: NextRequest) {
    try {
        const { id } = await req.json()
        if (!id) {
            throw new Error('No book id!')
        }
        await deleteBook(id)
        return NextResponse.json(({ success: true }))
    } catch (error: unknown) {
        console.error(error)
        if (!conformsToServerError(error)) throw error;
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export { handler as POST }