import { getBooksBy } from "@/app/lib/books";
import pb from '@/app/lib/db'
import Image from "next/image";
import Link from "next/link";
import edit from '@/assets/icons/edit-3-svgrepo-com.svg'
import { Book } from "@/app/types/book";
import { Tags } from "../shared/Tags";
import { DeleteBookLink } from "../DeleteBookLink";


function getThumbnail(book: any) {
    if (!book?.cover) return null;
    return pb.files.getUrl(book, book.cover, { thumb: '100x250' })
}

export default async function ShowBook({ params }: { params: { id: string } }) {
    const [book] = await getBooksBy('id', params.id)
    const url = getThumbnail(book);
    return <div className='flex flex-col px-8'>
        <Link href={`${params.id}/update`} className='absolute right-2 top-2 w-10 rounded-lg text-center'>
            <Image src={edit} alt='edit' />
        </Link>
        <img src={url || book.thumbnail || book.smallThumbnail} alt='Book Cover' className='self-center h-80 w-60 mt-2 object-contain' />
        <div>
            <Tags book={book} />
            <h1 className='text-xl'>{book.title}</h1>
            <h2 className='text-lg'>{book.authors?.join?.(', ')}</h2>
            <div>{book.publisher}</div>
            <div>{book.publishedDate}</div>
            <div>{book.pageCount}</div>
            <div>{book.categories?.join?.(', ')}</div>
            <p>{book.description}</p>
        </div>
        <DeleteBookLink id={book.id} title={book.title} className='my-5 md:w-48 md:self-end' />
    </div>
}