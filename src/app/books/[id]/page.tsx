import { getBooksBy } from "@/app/lib/books";
import pb from '@/app/lib/db'
import Image from "next/image";
import Link from "next/link";
import edit from '@/assets/icons/edit-3-svgrepo-com.svg'


export default async function ShowBook({ params }: { params: { id: string } }) {
    const [book] = await getBooksBy('id', params.id)
    const url = pb.files.getUrl(book, book.cover, { thumb: '100x250' })
    return <div className='flex flex-col items-center px-8'>
        <Link href={`${params.id}/update`} className='absolute right-2 top-2 w-10 rounded-lg text-center'>
            <Image src={edit} alt='edit' />
        </Link>
        <img src={url || book.coverUrl} alt='Book Cover' className='h-80 w-60 mt-2 object-contain' />
        <h1 className='text-3xl'>{book.title}</h1>
        <h2 className='text-2xl'>{book.authors[0]}</h2>
        <span>{book.isbn}</span>
    </div>
}