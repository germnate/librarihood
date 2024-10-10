import pb from './db'
import { Book } from '../types/book'

function getBook(id: string) {
    return pb.collection('Books').getOne(id)
}

function createBook(book: Book) {
    return pb.collection('Books').create(book)
}

function getBooksBy(field: string, value: string) {
    return pb.collection('Books').getFullList({
        filter: `${field} = ${value}`
    })
}

export { getBook, createBook, getBooksBy }