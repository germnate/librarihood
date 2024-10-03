interface Book {
    id: string;
    created: string;
    updated: string;
    title: string;
    author: string;
    isbn?: string;
    description?: string;
    pageCount?: number;
    cover?: string;
}

export type { Book }