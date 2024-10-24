'use client';

import { useRef, useState, useEffect } from 'react'
import { Book } from '@/app/types/book';
import { fetchUtil } from '@/app/utils';
import { FileSelector, COVER_TYPE } from './FileSelector';

function parseStringData(dataString: FormDataEntryValue | null) {
  if (!dataString) return [];
  const string = new String(dataString)
  return JSON.stringify(string.trim().split(',').filter(Boolean))
}

export function Form({ userId, book }: { userId: string | undefined, book?: Book | undefined }) {
  const [state, setState] = useState({
    coverType: COVER_TYPE.FILE,
    title: '',
    authors: '',
    isbn: '',
    publisher: '',
    publishedDate: '',
    pageCount: '',
    categories: '',
    tags: '',
    description: '',
  })
  useEffect(() => {
    if (!book) return;
    setState({
      ...state,
      title: book.title,
      authors: book.authors.join(', ') || '',
      isbn: book.isbn || '',
      publisher: book.publisher || '',
      publishedDate: book.publishedDate || '',
      pageCount: `${book.pageCount}` || '',
      categories: book.categories?.join(', ') || '',
      tags: book.tags?.join?.(', ') || '',
      description: book.description || ''
    })
  }, [])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const authorsData = parseStringData(formData.get('authors'))
    const genresData = parseStringData(formData.get('categories'))
    const tagsData = parseStringData(formData.get('tags'))
    const bookData = {
      ...book,
      title: state.title,
      authors: authorsData,
      isbn: state.isbn,
      publisher: state.publisher,
      publishedDate: state.publishedDate,
      pageCount: state.pageCount,
      categories: genresData,
      tags: tagsData,
      description: state.description
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
    formData.set('authors', parseStringData(formData.get('authors')))
    formData.set('categories', parseStringData(formData.get('categories')))
    formData.set('tags', parseStringData(formData.get('tags')))
    if (state.coverType === 'file' && fileInputRef?.current?.files?.length) {
      formData.append('cover', fileInputRef.current.files[0])
      formData.delete('thumbnail')
    }
    const url = '/api/books/new'
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

  const handleChangeEvent = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: e.target.value
    })
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
            value={state.title}
            onChange={handleChangeEvent('title')}
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
            value={state.authors}
            onChange={handleChangeEvent('authors')}
            placeholder='Separate authors with a comma. (e.g. J.R.R Tolkien, J.K. Rowling)'
          />
        </div>
        <div className='flex flex-col'>
          <label>ISBN</label>
          <input
            type='text'
            name='isbn'
            className='p-2 border'
            value={state.isbn}
            onChange={handleChangeEvent('isbn')}
            placeholder='ISBN-10 and ISBN-13 accepted.'
          />
        </div>
        <div className='flex flex-col'>
          <label>Publisher</label>
          <input
            type='text'
            name='publisher'
            className='p-2 border'
            value={state.publisher}
            onChange={handleChangeEvent('publisher')}
            placeholder='Publisher'
          />
        </div>
        <div className='flex flex-col'>
          <label>Published Date</label>
          <input
            type='date'
            name='publishedDate'
            className='p-2 border'
            value={state.publishedDate}
            onChange={handleChangeEvent('publishedDate')}
            placeholder='Published Date'
          />
        </div>
        <div className='flex flex-col'>
          <label>Page Count</label>
          <input
            type='number'
            name='pageCount'
            className='p-2 border'
            value={state.pageCount}
            onChange={handleChangeEvent('pageCount')}
            placeholder='#'
          />
        </div>
        <div className='flex flex-col'>
          <label>Genres</label>
          <input
            type='text'
            name='categories'
            className='p-2 border'
            value={state.categories}
            onChange={handleChangeEvent('categories')}
            placeholder='Separate Genres with a comma.'
          />
        </div>
        <div className='flex flex-col'>
          <label>Tags</label>
          <input
            type='text'
            name='tags'
            className='p-2 border'
            value={state.tags}
            onChange={handleChangeEvent('tags')}
            placeholder='Enter other things to filter by, not genres'
          />
        </div>
        <div className='flex flex-col'>
          <label>Description</label>
          <input
            type='text'
            name='description'
            className='p-2 border'
            value={state.description}
            onChange={handleChangeEvent('description')}
            placeholder='Description'
          />
        </div>
        {!book ?
          <FileSelector
            coverType={state.coverType}
            setCoverType={(coverType) => setState({ ...state, coverType })}
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