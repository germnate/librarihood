'use client';

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getDetailedError } from '../utils';
import { SignUpErrorDisplay } from '../errors/SignUpErrorDisplay';

export default function Signup() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState('')
  const [details, setDetails] = useState<Array<Array<string>>>([])
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')
    const passwordConfirm = formData.get('passwordConfirm')
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        passwordConfirm
      })
    })

    const response = await res.json()
    console.log(response)
    console.log(getDetailedError(response.details.data))
    if(response.success) {
      router.push('/')
    } else {
      setSubmitError(response.message)
      setDetails(getDetailedError(response.details.data))
    }

  }

  return (
    <div className='w-3/4 mx-auto mt-20 p-5 rounded bg-gray-200'>
      <h1 className='text-center text-3xl'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col'>
          <label>username</label>
          <input type='text' name='username' className='p-2' required />
        </div>
        <div className='flex flex-col'>
          <label>password</label>
          <input type='password' name='password' className='p-2' pattern=".{8,}" title='Minimum of 8 characters' required />
        </div>
        <div className='flex flex-col'>
          <label>password confirm</label>
          <input type='password' name='passwordConfirm' className='p-2' pattern=".{8,}" title='Minimum of 8 characters' required />
        </div>
        
        <div className='flex flex-col-reverse gap-3 sm:flex-row justify-between items-center'>
          <SignUpErrorDisplay error={submitError} details={details} />
          <button type='submit' className='w-full sm:w-auto px-4 py-2 self-start rounded-2xl bg-gray-800 text-gray-200 whitespace-nowrap'>Sign Up</button>
        </div>
      </form>
      
    </div>
  );
}