import { getBook } from "@/app/lib/books";


export default async function ShowBook({ params }: { params: { id: string } }) {
    const book = await getBook(params.id)
    return <div className='m-4'>
        <h1 className='text-5xl'>{book.title}</h1>
        <h2 className='text-2xl'>{book.author}</h2>
        <span>{book.isbn}</span>
    </div>
}