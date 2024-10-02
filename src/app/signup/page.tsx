'use client';

import { useState } from 'react'

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const create = async () => {
    await fetch('http://127.0.0.1:8090/api/collections/users/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      })
    })
  }

  return (
    <div className='w-3/4 mx-auto mt-20 p-5 rounded bg-gray-200'>
      <h1 className='text-center text-3xl'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col'>
          <label>username</label>
          <input type='text' name='username' onChange={onChangeUsername} />
        </div>
        <div className='flex flex-col'>
          <label>password</label>
          <input type='password' name='password' onChange={onChangePassword} />
        </div>
        <button type='submit' className='px-4 py-2 self-end rounded-2xl bg-gray-800 text-gray-200'>Sign Up</button>
      </form>
    </div>
  );
}