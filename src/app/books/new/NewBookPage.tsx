'use client';

import { fetchUtil } from "@/app/utils";
import { useRef, useState } from 'react'

export default function NewBookPage({ userId }: { userId: string | undefined }) {
  const [coverType, setCoverType] = useState('file');
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) throw new Error('No User Error!')
    const formData = new FormData(e.currentTarget);
    formData.delete('select')
    if (coverType === 'file' && fileInputRef?.current?.files?.length) {
      formData.append('cover', fileInputRef.current.files[0])
      formData.delete('coverUrl')
    }
    formData.append('userId', userId)
    const res = await fetch('/api/books/new', {
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

  const setFile = () => {
    setCoverType('file');
  }
  const setUrl = () => {
    setCoverType('url');
  }

  return (
    <div>
      <div className='flex flex-col p-4'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label>Title</label>
            <input type='text' name='title' className='p-2 border' required />
          </div>
          <div className='flex flex-col'>
            <label>Author</label>
            <input type='text' name='author' className='p-2 border' />
          </div>
          <div className='flex flex-col'>
            <label>ISBN</label>
            <input type='text' name='isbn' className='p-2 border' />
          </div>
          <div className='flex gap-2'>
            <input id='file-label' type='radio' name='select' onChange={setFile} value={coverType} checked={coverType === 'file'} />
            <label htmlFor='file-label'>File</label>
          </div>
          <div className='flex gap-2'>
            <input id='url-label' type='radio' name='select' onChange={setUrl} value={coverType} checked={coverType === 'url'} />
            <label htmlFor='url-label'>Url</label>
          </div>
          <input ref={fileInputRef} type='file' accept='.jpg, .png, .webp' className={coverType !== 'file' ? 'hidden' : 'p-2 border'} />
          <input name='coverUrl' className={coverType === 'file' ? 'hidden' : 'p-2 border'} />
          <button type='submit' className='border py-2 bg-green-100 hover:bg-green-200'>
            Create
          </button>
        </form>
      </div>
    </div>
  )
}