import { updateBook } from "@/app/lib/books"
import { conformsToBook, conformsToBookFormData } from '@/app/types/book'
import { conformsToServerError } from "@/app/types/errors/ServerError"
import { NextRequest, NextResponse } from "next/server"

async function handler(req: NextRequest) {
    try {
        let book;
        if (req.headers.get('content-type') === 'application/json') {
            const json = await req.json();
            if (!conformsToBook(json)) return;
            book = await updateBook(json)
        } else {
            const formData = await req.formData()
            if (!conformsToBookFormData(formData, { isNew: true })) return;
            book = await updateBook(formData)
        }
        return NextResponse.json(({ bookId: book.id }))
    } catch (error: unknown) {
        console.error(error)
        if (!conformsToServerError(error)) throw error;
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export { handler as POST }