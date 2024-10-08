import { Card } from "./Card"
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import pb from '../lib/db'
import { BookList } from "./BookList";
import { Book } from "../models/book";
import { RecordModel } from "pocketbase";
import { SessionUser } from "../types/session-user";

async function Dashboard() {
  const session = await getServerSession(options);
  const user: SessionUser | undefined = session?.user
  let books: Array<RecordModel> = []
  if(user?.id) {
    console.log('user', session?.user)
    books = await pb.collection('Books').getFullList({
      filter: `userId = '${user.id}'`,
    })
    console.log('records', books)
  }

  const bookCollection = Book.collection(books)
  return (
    <div className=''>
      <BookList books={bookCollection} />
    </div>
  )
}

export default Dashboard
