import { createBook } from "@/app/lib/books"
import { ServerError, conformsToServerError } from "@/app/types/errors/ServerError"
import { NextRequest, NextResponse } from "next/server"

async function handler(req: NextRequest) {
    try {
        const submissionData = await req.json()
        if (!submissionData.userId) {
            throw new Error('No user found!')
        }
        if (!submissionData.title) {
            throw new Error('No title found!')
        }
        const book = await createBook(submissionData)
        return NextResponse.json(({ bookId: book.id }))
    } catch (error: unknown) {
        console.error(error)
        if (!conformsToServerError(error)) throw error;
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export { handler as POST }