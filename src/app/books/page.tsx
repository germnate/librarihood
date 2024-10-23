import Link from "next/link"
import { BookList } from "./BookList";
import { Book } from "../models/book";
import { SessionUser } from "../types/session-user";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { RecordModel } from "pocketbase";
import pb from '@/app/lib/db'
import { AddBookLink } from "./AddBookLink";

export default async function ManageBooks() {
    const session = await getServerSession(options);
    const user: SessionUser | undefined = session?.user
    let books: Array<RecordModel> = []
    if (user?.id) {
        books = await pb.collection('books').getFullList({
            filter: `userId = '${user.id}'`,
            cache: 'no-store'
        })
    }

    const bookCollection = Book.collection(books)
    return (
        <div className='pt-4'>
            {!bookCollection.length
                ? <div className='flex justify-center'><AddBookLink /></div>
                : <BookList books={bookCollection} />}
        </div>
    )

}