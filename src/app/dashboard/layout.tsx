'use client';

import { ReactNode, useState } from 'react'
import Link from 'next/link'

function DashboardLayout({children}: {children: ReactNode}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <nav className='flex flex-col md:flex-row justify-between p-4 bg-slate-600 text-gray-400 shadow-md'>
        <div className='flex flex-row-reverse justify-between items-center'>
          <button onClick={() => setOpen(!isOpen)} className='md:hidden hover:text-orange-200 transition-all duration-300'>| | |</button>
          <Link href='#' className='p-2 hover:text-orange-200 transition-all duration-300'>Home</Link>
        </div>
        <div className={`flex flex-col md:flex-row overflow-hidden transition-all duration-300 ${isOpen ? 'h-32' : 'h-0'} md:h-auto`}>
          <Link href='#' className='p-2 hover:text-orange-200 transition-all duration-300'>My Items</Link>
          <Link href='#' className='p-2 hover:text-orange-200 transition-all duration-300'>Borrowed Items</Link>
          <Link href='#' className='p-2 border-t border-gray-400 md:border-none md:ml-5 hover:text-orange-200 transition-all duration-300'>Signout</Link>
        </div>
      </nav>
      {children}
    </>
  )
}

export default DashboardLayout