import { Card } from "./Card"
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import pb from '../lib/db'
import { BookList } from "./BookList";
import { Book } from "../models/book";

async function Dashboard() {
  const session = await getServerSession(options);
  const collection = await pb.collection('Books').getFullList();
  const books = Book.collection(collection)
  console.log(books)
  return (
    <div className=''>
      <BookList books={books} />
    </div>
  )
}

export default Dashboard