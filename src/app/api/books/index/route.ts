import { NextRequest, NextResponse } from "next/server";
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
        console.log('json', json)
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
    try {
        const books = await getBooks(filterString.join(' and '))
        return NextResponse.json({ books });
    } catch (error) {
        console.error(error)
        if (!conformsToServerError(error)) throw error;
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export { handler as POST }