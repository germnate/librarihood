'use client';

import { Card } from "./Card"
import type { Book } from "../types/book"
import Link from "next/link"
import { AddBookLink } from "./AddBookLink"
import { BooksRecord } from "../../../pocketbase-types"
import { useNavBarStatus } from "../NavBarStatusContext"

function BookList({ books }: { books: Array<BooksRecord> }) {
  const { navBarStatus } = useNavBarStatus();
  return (
    <>
      <div className={`${navBarStatus ? 'ml-20 md:ml-32' : '-translate-x-full'} absolute z-[15] bottom-0 top-0 right-0 left-0 px-2 py-5 bg-black opacity-[80%] transition-all duration-300`}>
        <input className='w-full lg:w-1/2 rounded-full px-2' type='search' name='search' placeholder='Search...' />
      </div>
      <div className='flex flex-col items-center md:items-start md:flex-row flex-wrap mx-4 gap-7'>
        {books.map(book => <Card key={book.id} book={book} />)}
      </div>
    </>
  )
}

export { BookList }