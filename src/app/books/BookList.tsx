'use client';

import { Card } from "./Card"
import { BooksRecord } from "../../../pocketbase-types"
import { useNavBarStatus } from "../NavBarStatusContext"
import { fetchUtil } from "../utils";
import { useEffect, useState } from "react";



function BookList({ userId }: { userId: string | undefined }) {
  const { navBarStatus } = useNavBarStatus();
  const [books, setBooks] = useState<Array<BooksRecord>>([]);
  async function getBooks(userId: string | undefined) {
    try {
      console.log('calling getBooks...')
      const res = await fetchUtil({ url: '/api/books/index', body: { userId, tokens: [] } })
      const data = await res.json();
      console.log(data);
      if (data.books) setBooks(data.books)
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  useEffect(() => {
    getBooks(userId);
  }, [])
  return (
    <>
      <div className={`${navBarStatus ? 'ml-20 md:ml-32' : '-translate-x-full'} absolute z-[15] bottom-0 top-0 right-0 left-0 px-2 py-5 bg-black opacity-[80%] transition-all duration-300`}>
        <input className='w-full lg:w-1/2 rounded-full px-2' type='search' name='search' placeholder='Search...' />
        <button onClick={() => getBooks(userId)} className='bg-green-500 px-2 mt-2 py-1 text-gray-700 rounded-full'>Search</button>
      </div>
      <div className='flex flex-col items-center md:items-start md:flex-row flex-wrap mx-4 gap-7'>
        {books.map(book => <Card key={book.id} book={book} />)}
      </div>
    </>
  )
}

export { BookList }