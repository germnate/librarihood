'use client';

import { useState } from 'react'
import harryPotter from '@/app/harryPotter.json'

export function IsbnSearch() {
  const [isbn, setIsbn] = useState('')
  const [json, setJson] = useState({})
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/books/fetch?isbn=${isbn}`)
    const data = await response.json();
    console.log(data)
    setJson(data);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsbn(e.target.value)
  }
  return (
    <div className='flex flex-col p-4 items-center font-sans w-full '>
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
      <div>
        Search Results: {harryPotter.data.totalItems}

      </div>
    </div>
  )
}