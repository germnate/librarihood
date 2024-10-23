import { Item } from "@/app/types/google-books-api";
import { AddToCollection } from "./AddToCollection";

export function IsbnSearchResult({ item, userId }: { item: Item, userId: string | undefined }) {
  const hasImage: Boolean = !!item.volumeInfo?.imageLinks?.smallThumbnail

  return (
    <div className='flex flex-col md:flex-row p-4 mb-10 gap-8 border shadow-lg'>
      {hasImage
        ? <img
          className='bg-gray-200 self-center'
          src={item.volumeInfo.imageLinks?.smallThumbnail}
          alt='thumbnail'
        />
        : <div className='self-center flex justify-center items-center w-32 h-48 p-4 text-center bg-gray-200'
        >
          Image not found
        </div>
      }

      <div className='flex flex-col justify-between'>
        <div>
          <h1 className='font-bold'>{item.volumeInfo.title}</h1>
          <h2>{item.volumeInfo.authors?.[0]}</h2>
          <div>
            <label>Publisher: </label><span>{item.volumeInfo.publisher}</span>
          </div>
          <div>
            <label>Date Published: </label><span>{item.volumeInfo.publishedDate}</span>
          </div>
        </div>
        <AddToCollection userId={userId} item={item} />
      </div>
    </div >
  )
}