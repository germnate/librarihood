'use client';

import { fetchUtil } from "@/app/utils";
// import { useRouter } from "next/navigation";

export default function NewBookPage({ userId }: { userId: string | undefined }) {
  // const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) throw new Error('No User Error!')
    const formData = new FormData(e.currentTarget);
    const res = await fetchUtil({
      url: '/api/books/new',
      body: {
        title: formData.get('title'),
        author: formData.get('author'),
        isbn: formData.get('isbn'),
        userId,
      }
    })
    // router.push('/books')
    // /books is making sure to set cache: no-store
    // I've verified that the header is set in the browser
    // However, for some reason router.push('/books') or router.replace('/books')
    // will not initiate a request on the server despite traveling to the /books page.
    // There is no 200 response from the server. In the meantime,
    // the below option is working as expected.
    window.location.href = '/books'
  }

  return (
    <div>
      <div className='flex flex-col p-4 border'>
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
          <button type='submit' className='border py-2 bg-green-100 hover:bg-green-200'>
            Create
          </button>
        </form>
      </div>
    </div>
  )
}