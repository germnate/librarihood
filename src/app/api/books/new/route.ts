import { createBook } from "@/app/lib/books"
import { ServerError, conformsToServerError } from "@/app/types/errors/ServerError"
import { NextRequest, NextResponse } from "next/server"

async function handler(req: NextRequest) {
    try {
        const submissionData = await req.json()
        const book = await createBook(submissionData)
        return NextResponse.json(({ success: true, bookId: book.id }), { status: 200 })
    } catch (error) {
        console.error(error)
        if (!conformsToServerError(error)) return NextResponse.json({ error }, { status: 500 });
        const serverError = error as ServerError
        const status = serverError.status || 500;
        const message = serverError.message || 'Internal server error';
        const details = serverError.data || {}
        return NextResponse.json({ message, details }, { status });
    }
}

export { handler as POST }