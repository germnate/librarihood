import pb from './db'
import { Book, BookFormData } from '../types/book'

function getBook(id: string) {
    return pb.collection('books').getOne(id)
}

function getBooksBy(field: string, value: string) {
    return pb.collection('books').getFullList({
        filter: `${field} = "${value}"`,
        cache: 'no-store'
    })
}

function createBook(book: Book | BookFormData) {
    return pb.collection('books').create(book)
}

function updateBook(book: Book | BookFormData) {
    return pb.collection('books').update(book.id, book)
}

function deleteBook(id: string) {
    return pb.collection('books').delete(id);
}

export { getBook, createBook, updateBook, getBooksBy, deleteBook }