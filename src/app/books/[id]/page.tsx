import { getBooksBy } from "@/app/lib/books";
import pb from '@/app/lib/db'
import Image from "next/image";
import Link from "next/link";
import edit from '@/assets/icons/edit-3-svgrepo-com.svg'
import { Book } from "@/app/types/book";
import { DeleteBookLink } from "../DeleteBookLink";


function getThumbnail(book: any) {
    if (!book?.cover) return null;
    return pb.files.getUrl(book, book.cover, { thumb: '100x250' })
}

export default async function ShowBook({ params }: { params: { id: string } }) {
    const [book] = await getBooksBy('id', params.id)
    const url = getThumbnail(book);
    return <div className='flex flex-col items-center px-8'>
        <Link href={`${params.id}/update`} className='absolute right-2 top-2 w-10 rounded-lg text-center'>
            <Image src={edit} alt='edit' />
        </Link>
        <DeleteBookLink id={book.id} title={book.title} className='my-5 md:w-48 md:self-end' />
    </div>
}