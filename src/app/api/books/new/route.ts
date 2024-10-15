import { createBook } from "@/app/lib/books"
import { ServerError, conformsToServerError } from "@/app/types/errors/ServerError"
import { NextRequest, NextResponse } from "next/server"

async function handler(req: NextRequest) {
    try {
        const submissionData = await req.json()
        const book = await createBook(submissionData)
        return NextResponse.json(({ bookId: book.id }))
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 });
    }
}

export { handler as POST }