import { executeQuery } from "@/app/external_api/google-book"
import { conformsToServerError } from "@/app/types/errors/ServerError"
import { NextRequest, NextResponse } from "next/server"

export function validIsbn10(isbn: string) {
  return isbn.match(/^(?:\d{9}X|\d{10})$/)
}

export function validIsbn13(isbn: string) {
  return isbn.match(/^(978|979)-?\d{10}$/)
}

async function handler(req: NextRequest) {
  try {
    const url = new URL(req.url)
    console.log(req)
    let isbn = url.searchParams.get('isbn')
    if (!isbn || (!validIsbn10(isbn) && !validIsbn13(isbn))) {
      throw new Error('This function requires a valid isbn')
    }
    if (validIsbn13(isbn)) {
      isbn = isbn.replace(/-/g, '')
    }
    const res = await executeQuery(isbn)
    const data = await res.json();
    return NextResponse.json({ data })
  } catch (error) {
    console.error(error)
    if (!conformsToServerError(error)) throw error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export { handler as GET }