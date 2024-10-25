import { executeQuery } from "@/app/external_api/google-book"
import { conformsToServerError } from "@/app/types/errors/ServerError"
import { NextRequest, NextResponse } from "next/server"
import { validIsbn10, validIsbn13 } from "@/app/utils"

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