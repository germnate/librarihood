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
      <div className={`${navBarStatus ? 'ml-24 md:ml-36' : '-translate-x-full'} absolute z-[15] bg-gray-500 transition-all duration-300`}>
        <input type='search' name='search' placeholder='Search...' />
      </div>
      <div className='flex flex-col items-center md:items-start md:flex-row flex-wrap mx-4 gap-7'>
        {books.map(book => <Card key={book.id} book={book} />)}
      </div>
    </>
  )
}

export { BookList }