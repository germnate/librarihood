import pb from './db'
import { Book, BookFormData } from '../types/book'

function getBook(id: string) {
    return pb.collection('Books').getOne(id)
}

function getBooksBy(field: string, value: string) {
    return pb.collection('Books').getFullList({
        filter: `${field} = "${value}"`,
        cache: 'no-store'
    })
}

function createBook(book: Book | BookFormData) {
    return pb.collection('Books').create(book)
}

function updateBook(book: Book | BookFormData) {
    return pb.collection('Books').update(book.id, book)
}

function deleteBook(id: string) {
    return pb.collection('Books').delete(id);
}

export { getBook, createBook, updateBook, getBooksBy, deleteBook }