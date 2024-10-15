import { Card } from "./Card"
import type { Book } from "../types/book"
import Link from "next/link"
import { AddBookLink } from "./AddBookLink"

function BookList({ books }: { books: Array<Book> }) {
  return (
    <div>
      <div className='flex justify-end mt-4 px-4'>
        <AddBookLink />
      </div>
      <div className='flex flex-col md:flex-row flex-wrap my-5 mx-4 gap-7'>
        {books.map(book => <Card key={book.id} book={book} />)}
      </div>
    </div>
  )
}

export { BookList }