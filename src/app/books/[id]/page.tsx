import { getBooksBy } from "@/app/lib/books";
import pb from '@/app/lib/db'
import Link from "next/link";


export default async function ShowBook({ params }: { params: { id: string } }) {
    const [book] = await getBooksBy('id', params.id)
    const url = pb.files.getUrl(book, book.cover, { thumb: '100x250' })
    return <div className='flex flex-col items-center m-4'>
        <Link href={`${params.id}/update`}>Edit</Link>
        <img src={url || book.coverUrl} alt='Book Cover' className='h-80 w-60 object-contain bg-gray-700' />
        <h1 className='text-5xl'>{book.title}</h1>
        <h2 className='text-2xl'>{book.author}</h2>
        <span>{book.isbn}</span>
    </div>
}