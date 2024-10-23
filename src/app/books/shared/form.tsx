'use client';

import { useRef, useState, useEffect } from 'react'
import { Book } from '@/app/types/book';
import { fetchUtil } from '@/app/utils';
import { FileSelector, COVER_TYPE } from './FileSelector';

function parseAuthors(authorsString: FormDataEntryValue | null) {
  if (!authorsString) return [];
  const string = new String(authorsString)
  return JSON.stringify(string.trim().split(',').filter(Boolean))
}

export function Form({ userId, book }: { userId: string | undefined, book?: Book | undefined }) {
  const [coverType, setCoverType] = useState(COVER_TYPE.FILE);
  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState('')
  const [isbn, setIsbn] = useState('')
  useEffect(() => {
    if (!book) return;
    setTitle(book.title)
    setAuthors(book?.authors.join(', ') || '')
    setIsbn(book?.isbn || '')
  }, [])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const authorsData = parseAuthors(formData.get('authors'))
    const bookData = {
      ...book,
      title,
      authors: authorsData,
      isbn,
    }
    const res = await fetchUtil({ url: '/api/books/update', body: bookData, method: 'PATCH' })
    const { bookId } = await res.json();
    window.location.href = `/books/${bookId}`
  }
  const handleSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!userId) throw new Error('No User Error!')
    if (book) formData.append('id', book.id)
    formData.append('userId', userId)
    formData.delete('select')
    formData.set('authors', parseAuthors(formData.get('authors')))
    if (coverType === 'file' && fileInputRef?.current?.files?.length) {
      formData.append('cover', fileInputRef.current.files[0])
      formData.delete('coverUrl')
    }
    const url = `/api/books/${book ? 'update' : 'new'}`
    const res = await fetch(url, {
      method: 'POST',
      body: formData
    })
    const { bookId } = await res.json();
    // router.push('/books')
    // /books is making sure to set cache: no-store
    // I've verified that the header is set in the browser
    // However, for some reason router.push('/books') or router.replace('/books')
    // will not initiate a request on the server despite traveling to the /books page.
    // There is no 200 response from the server. In the meantime,
    // the below option is working as expected.
    window.location.href = `/books/${bookId}` // and same issue with /books/:id
  }

  return (
    <div className='flex flex-col p-4 items-center'>
      <form onSubmit={book ? handleSubmitUpdate : handleSubmitCreate} className='flex flex-col gap-4 w-full md:w-3/4 xl:w-1/2'>
        <div className='flex flex-col'>
          <label>Title</label>
          <input
            type='text'
            name='title'
            className='p-2 border'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder='Title'
          />
        </div>
        <div className='flex flex-col'>
          <label>Authors</label>
          <input
            type='text'
            name='authors'
            className='p-2 border'
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            placeholder='Separate authors with a comma. (e.g. J.R.R Tolkien, J.K. Rowling)'
          />
        </div>
        <div className='flex flex-col'>
          <label>ISBN</label>
          <input
            type='text'
            name='isbn'
            className='p-2 border'
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder='ISBN-10 and ISBN-13 accepted.'
          />
        </div>
        {!book ?
          <FileSelector
            coverType={coverType}
            setCoverType={setCoverType}
            fileInputRef={fileInputRef}
          />
          : null}
        <button type='submit' className='border py-2 bg-green-100 hover:bg-green-200'>
          {book ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  )
}