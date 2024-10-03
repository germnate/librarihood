import { Card } from "./Card"
import type { Book } from "../types/book"

function BookList({ books }: { books: Array<Book> } ) {
  return <div className='flex flex-col md:flex-row flex-wrap my-14 mx-4 gap-7'>
    {books.map(book => <Card key={book.id} book={book} />)}
  </div>
}

export { BookList }