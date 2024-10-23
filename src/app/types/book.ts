interface Book {
    id: string;
    userId: string | undefined;
    created: string;
    updated: string;
    title: string;
    authors: Array<string>;
    isbn?: string;
    description?: string;
    pageCount?: number;
    cover?: File;
    coverUrl?: string;
}

export type { Book }

export interface BookFormData extends FormData {
    id: string,
    userId: string,
    title: string,
    author?: string | undefined | null,
    isbn?: string | undefined | null,
    coverUrl?: string | undefined | null,
    cover?: File | undefined | null,
}

export function conformsToBookFormData(formData: FormData, options?: { isNew: boolean }): formData is BookFormData {
    if (!formData.get('userId')) {
        throw new Error('No user found!')
    }
    if (!formData.get('title')) {
        throw new Error('No title found!')
    }
    if (!options?.isNew && !formData.get('id')) {
        throw new Error('No book id!')
    }
    return true;
}

export function conformsToBook(json: any, options?: { isNew: boolean }): json is Book {
    if (!json.userId) {
        throw new Error('No user found!')
    }
    if (!json.title) {
        throw new Error('No title found!')
    }
    if (!options?.isNew && !json.id) {
        throw new Error('No book id!')
    }
    return true;
}