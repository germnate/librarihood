import { NextRequest, NextResponse } from "next/server";
import pb from '@/app/lib/db'
import { conformsToServerError } from "@/app/types/errors/ServerError";
import { getBooks } from "@/app/lib/books";

type Payload = {
    userId: string,
    tokens: Array<string> | []
}

const COLUMNS = ['title', 'publisher', 'publishedDate', 'isbn']
const ARRAY_COLUMNS = ['authors', 'tags', 'categories']

async function handler(req: NextRequest) {
    let json: Payload | undefined;
    try {
        json = await req.json();
        if (!json?.userId) {
            throw new Error('No user id!')
        }
    } catch (error) {
        console.error(error)
        if (!conformsToServerError(error)) throw error;
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const filters: Array<string> = [];
    if (json?.tokens.length) {
        console.log(json)
        ARRAY_COLUMNS.forEach(column => {
            json.tokens.forEach(token => {
                filters.push(`${column}[] ~ ${token}`)
            })
        })
        COLUMNS.forEach(column => {
            json.tokens.forEach(token => {
                filters.push(`${column} ~ ${token}`)
            })
        })
    }
    const filterString = [`userId = '${json.userId}'`]
    if (filters.length) filterString.push(`(${filters.join(' || ')})`)
    const books = await getBooks(filterString.join(' and '))
    return NextResponse.json({ books });
}

export { handler as POST }