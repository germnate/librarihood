function apiUrl(isbn: string) {
    return `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_BOOK_API}`
}

function executeQuery(isbn: string) {
    return fetch(apiUrl(isbn))
}

export { apiUrl, executeQuery }
