import { ReactNode } from 'react'
import Link from 'next/link'

function DashboardLayout({children}: {children: ReactNode}) {
  return (
    <>
      <nav className='flex flex-col md:flex-row justify-between p-4 gap-4 bg-slate-600 text-gray-400 shadow-md'>
        <Link href='#' className='border border-gray-400 p-2 rounded hover:text-orange-200 hover:bg-gray-400 transition-all duration-300'>Home</Link>
        <div className='flex flex-col md:flex-row gap-4'>
          <Link href='#' className='border border-gray-400 p-2 rounded hover:text-orange-200 hover:bg-gray-400 transition-all duration-300'>My Items</Link>
          <Link href='#' className='border border-gray-400 p-2 rounded hover:text-orange-200 hover:bg-gray-400 transition-all duration-300'>Borrowed Items</Link>
        </div>
      </nav>
      {children}
    </>
  )
}

export default DashboardLayout