'use client';

export default function NewBookPage({ userId }: { userId: string | undefined }) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) throw new Error('No User Error!')
    const formData = new FormData(e.currentTarget);
    await fetch('/api/books/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: formData.get('title'),
        author: formData.get('author'),
        isbn: formData.get('isbn'),
        userId,
      })
    })
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