'use client';

import { Item } from "@/app/types/google-books-api";
import { fetchUtil } from "@/app/utils";

function getIsbn(item: Item) {
    return item?.volumeInfo?.industryIdentifiers?.find(each => each.type === 'ISBN_13') ||
        item?.volumeInfo?.industryIdentifiers?.find(each => each.type === 'ISBN_10') || null
}


export function AddToCollection({ userId, item }: { userId: string | undefined, item: Item }) {
    async function addToCollection() {
        const { volumeInfo } = item
        const body = {
            userId,
            title: volumeInfo.title,
            authors: volumeInfo.authors,
            isbn: getIsbn(item)?.identifier,
            publisher: volumeInfo.publisher,
            publishedDate: volumeInfo.publishedDate,
            description: volumeInfo.description,
            pageCount: volumeInfo.pageCount,
            categories: volumeInfo.categories,
            smallThumbnail: volumeInfo.imageLinks?.smallThumbnail,
            thumbnail: volumeInfo.imageLinks?.thumbnail,
        }
        const res = await fetchUtil({ url: '/api/books/new', body })
        const json = await res.json();
        window.location.href = `/books/${json.bookId}`
    }

    return (
        <button onClick={addToCollection} className='justify-self-end block bg-libraryGray text-white py-2 md:w-64'>Add to Collection</button>
    )
}