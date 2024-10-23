import { DeleteBookLink } from "./DeleteBookLink"
import pb from '@/app/lib/db'
import { BooksRecord } from "../../../pocketbase-types";

function getThumbnail(book: any) {
  if (!book?.cover) return null;
  return pb.files.getUrl(book, book.cover, { thumb: '160x192' })
}

function Card({ book }: { book: BooksRecord }) {
  console.log(book.smallThumbnail, book.thumbnail)
  const url = getThumbnail(book)
  return (
    <a href={`/books/${book.id}`}>
      <img className='bg-gray-200 w-40 h-48' src={url || book.smallThumbnail || book.thumbnail} alt='thumbnail' />
      <h1 className='text-xl'>{book.title}</h1>
      <span className='text-sm'>{book.authors?.join(', ')}</span>
    </a>
  )
}

export { Card }