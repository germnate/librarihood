import { DeleteBookLink } from "./DeleteBookLink"
import pb from '@/app/lib/db'
import { BooksRecord } from "../../../pocketbase-types";

function getThumbnail(book: any) {
  if (!book?.cover) return null;
  return pb.files.getUrl(book, book.cover, { thumb: '160x192' })
}

function Card({ book }: { book: BooksRecord }) {
  const url = getThumbnail(book)
  const thumbnail = url || book.smallThumbnail || book.thumbnail
  return (
    <a href={`/books/${book.id}`} className='flex flex-col items-center'>
      {!!thumbnail ? <img className='w-40 h-48 object-contain' src={thumbnail} alt='thumbnail' />
        : <div className='flex justify-center items-center w-40 h-48 bg-gray-200'>No Image</div>
      }
      <h1 className='text-xl md:max-w-40 text-center'>{book.title}</h1>
      <h2 className='text-sm'>{book.authors?.join(', ')}</h2>
    </a>
  )
}

export { Card }