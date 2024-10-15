import pb from './db'
import { Book } from '../types/book'

function getBook(id: string) {
    return pb.collection('Books').getOne(id)
}

function getBooksBy(field: string, value: string) {
    return pb.collection('Books').getFullList({
        filter: `${field} = ${value}`
    })
}

function createBook(book: Book | FormData) {
    return pb.collection('Books').create(book)
}

function deleteBook(id: string) {
    return pb.collection('Books').delete(id);
}

export { getBook, createBook, getBooksBy, deleteBook }