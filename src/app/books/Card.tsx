import type { Book } from "../types/book"
import { DeleteBookLink } from "./DeleteBookLink"

async function Card({ book }: { book: Book }) {
  return (
    <div className='flex relative'>
      <a href={`/books/${book.id}`} className='w-full md:w-52 h-52 p-6 shadow-md border rounded-2xl flex-shrink-0 hover:shadow-lg transition-all'>
        <h1 className='text-xl'>{book.title}</h1>
        <span className='text-sm'>{book.author}</span>
      </a>
      <DeleteBookLink id={book.id} title={book.title} />
    </div>
  )
}

export { Card }