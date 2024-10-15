import Link from "next/link"

export function AddBookLink() {
    return <Link href="/books/new" className='py-2 px-4 border border-green-400 text-green-500 rounded shadow hover:scale-105 transition-all'>Add Book</Link>
}