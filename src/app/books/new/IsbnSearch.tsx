'use client';

import { useState } from 'react'
import harryPotter from '@/app/harryPotter.json'
import Image from 'next/image';
import { IsbnSearchResult } from './IsbnSearchResult';
import { GoogleJson, Item } from '@/app/types/google-books-api';

export function IsbnSearch({ userId }: { userId: string | undefined }) {
  const [isbn, setIsbn] = useState('')
  const [json, setJson] = useState<GoogleJson | any>({})
  const [showNoResults, setShowNoResults] = useState(false);
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/books/fetch?isbn=${isbn}`)
    const json = await response.json();
    console.log(json)
    setJson(json);
    if (json.data.totalItems === 0) {
      flash();
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsbn(e.target.value)
  }

  function flash() {
    console.log('setting flash');
    setShowNoResults(true);
    setTimeout(() => {
      setShowNoResults(false);
    }, 3000)
  }

  return (
    <div className='flex flex-col p-4 items-center font-sans'>
      <form className='flex items-center justify-center w-full md:w-3/4 xl:w-1/2' >
        <label>ISBN</label>
        <input
          type='number'
          name='isbn'
          className='p-2 mx-2 border w-full'
          value={isbn}
          onChange={onChange}
        />
        <button
          type='submit'
          onClick={handleSearch}
          className='h-10 w-10 bg-gray-300 shadow rounded hover:shadow-md hover:scale-105 transition-all'
        >
          &rarr;
        </button>
      </form >
      <div className='w-full'>
        Search Results: {json?.data?.totalItems || 0}
        <div className={`${showNoResults ? 'opacity-100 ' : 'opacity-0 '}px-4 py-2 bg-libraryGray text-gray-400 text-center rounded-full transition-all duration-300`}>No Results</div>
        {json?.error ? <p className='text-red-600'>Error: {json?.error}</p> : null}
        {
          json?.data ?
            json?.data?.items?.map((each: Item) => {
              const item = each
              return <IsbnSearchResult key={item.id} item={item} userId={userId} />
            }) : null
        }
      </div>
    </div>
  )
}