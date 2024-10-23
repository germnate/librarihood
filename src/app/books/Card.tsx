import type { Book } from "../types/book"
import { DeleteBookLink } from "./DeleteBookLink"

async function Card({ book }: { book: Book }) {
  return (
    <a href={`/books/${book.id}`}>
      <div className='border w-40 h-48 bg-slate-200'></div>
      <h1 className='text-xl'>{book.title}</h1>
      <span className='text-sm'>{book.authors[0]}</span>
    </a>
  )
}

export { Card }