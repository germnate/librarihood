import type { Book as BookType } from "../types/book";
import type { RecordModel } from "pocketbase";

class Book implements BookType {
    id: string;
    userId: string;
    created: string;
    updated: string;
    title: string;
    authors: Array<string>;
    isbn?: string;
    collectionId?: string | undefined;
    collectionName?: string | undefined;
    description?: string;
    pageCount?: number;
    cover?: File;
    smallThumbnail?: string | undefined;
    thumbnail?: string | undefined;

    constructor(data: RecordModel) {
        this.id = data?.id
        this.userId = data?.userId
        this.created = data?.created
        this.updated = data?.updated
        this.title = data?.title
        this.authors = data?.authors || []
        this.isbn = data?.isbn
        this.collectionId = data?.collectionId
        this.collectionName = data?.collectionName
        this.description = data?.description
        this.pageCount = data?.pageCount
        this.cover = data?.cover
    }

    static collection(books: Array<RecordModel>) {
        return books.map(book => new Book(book))
    }
}

export { Book }