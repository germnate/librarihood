import type { Book as BookType } from "../types/book";
import type { RecordModel } from "pocketbase";

class Book implements BookType {
    id: string;
    created: string;
    updated: string;
    title: string;
    author: string;
    isbn?: string;
    description?: string;
    pageCount?: number;
    cover?: string;

    constructor(data: RecordModel) {
        this.id = data?.id
        this.created = data?.created
        this.updated = data?.updated
        this.title = data?.title
        this.author = data?.author
        this.isbn = data?.isbn
        this.description = data?.description
        this.pageCount = data?.pageCount
        this.cover = data?.cover
    }

    static collection(books: Array<RecordModel>) {
        return books.map(book => new Book(book))
    }
}

export { Book }