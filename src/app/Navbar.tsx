'use client';

import { usePathname } from 'next/navigation'
import { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import book from '../assets/icons/book-2-svgrepo-com.svg'
import swap from '../assets/icons/swap-svgrepo-com.svg'
import plus from '../assets/icons/plus-large-svgrepo-com.svg'

const commonClassNames = 'route flex justify-center mx-auto rounded-lg shadow-dark cursor-pointer transition-all hover:rounded-none'

function NavBar() {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  function constructClassNames(href: string, classNames: string) {
    const classes = [commonClassNames];
    if (href === pathname) {
      classes.push('current-route');
    }
    const result = classes.concat(classNames).join(' ')
    return result;
  }

  return (
    <>
      <div className={`${isOpen ? '' : '-translate-x-full'} absolute w-full h-full bg-black opacity-[0.3] transition-all duration-300`}></div>
      <nav className={`${isOpen ? 'shadow-right' : '-translate-x-full'} fixed h-screen w-32 py-5 bg-libraryGray transition-all duration-300`}
      >
        <div className='flex flex-col h-full justify-between'>
          <div>
            <Link
              href='/dashboard'
              className={`${constructClassNames('/dashboard', 'mb-8 bg-libraryBlue')}`}
              style={{ color: 'black', width: '60px', height: '60px' }}
            >
              <Image src={swap} alt='swap' width={40} height={40} />
            </Link>
            <Link
              href='/books'
              className={`${constructClassNames('/books', 'mb-8 bg-libraryOrange')}`}
              style={{ color: 'black', width: '60px', height: '60px' }}
            >
              <Image src={book} alt='book' width={60} height={60} />
            </Link>
            <Link
              href='/books/new'
              className={`${constructClassNames('/books/new', 'mb-8 bg-libraryOrange')}`}
              style={{ color: 'black', width: '60px', height: '60px' }}
            >
              <Image src={plus} alt='plus' width={60} height={60} />
            </Link>
          </div>
          <Link href='/api/auth/signout' className='text-center text-white underline'>Sign Out</Link>
        </div>
        <div className='absolute -right-6 rounded-r-lg shadow top-1/2 h-32 w-6 bg-libraryGray cursor-pointer' onClick={() => { setOpen(!isOpen) }}></div>
      </nav >
    </>
  )
}

export { NavBar }