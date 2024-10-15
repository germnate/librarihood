import type { Book } from "../types/book"
import { DeleteBookLink } from "./DeleteBookLink"

async function Card({ book }: { book: Book }) {
  return (
    <div className='w-full md:w-52 h-52 p-6 shadow-md border rounded-2xl flex-shrink-0'>
      <DeleteBookLink id={book.id} title={book.title} />
      <h1 className='text-xl'>{book.title}</h1>
      <span className='text-sm'>{book.author}</span>
    </div>
  )
}

export { Card }