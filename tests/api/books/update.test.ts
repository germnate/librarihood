import { testApiHandler } from 'next-test-api-route-handler'
import * as updateBookHandler from "@/app/api/books/update/route";
import * as booksLib from "@/app/lib/books";
import { Book, BookFormData } from "@/app/types/book";

describe('POST update book', () => {
  let updateBookSpy: jest.SpyInstance;
  beforeEach(() => {
    updateBookSpy = jest.spyOn(booksLib, 'updateBook').mockImplementation(
      (b: Book | BookFormData) => {
        return Promise.resolve({
          id: "RECORD_ID",
          collectionId: "t3ndhiatfxd5xpf",
          collectionName: "Books",
          created: "2022-01-01 01:00:00.123Z",
          updated: "2022-01-01 23:59:59.456Z",
          userId: "test",
          title: b.title,
          author: b.author,
          isbn: b.isbn,
          description: "test",
          pageCount: 123,
          cover: "filename.jpg"
        });
      })
  })

  afterEach(() => {
    updateBookSpy.mockRestore();
  })

  it('accepts a post request and updates a book', async () => {
    await testApiHandler({
      appHandler: updateBookHandler,
      test: async ({ fetch }) => {
        const res = await fetch(
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              id: "RECORD_ID", title: 'lotr', author: 'tolkien', isbn: 'whatever', userId: 'my-user-id'
            }),

          }
        )
        expect(await res.json()).toStrictEqual({ bookId: 'RECORD_ID' });
      }
    })
  })

  it('handles errors', async () => {
    updateBookSpy.mockImplementation(() => {
      throw new Error('test error!');
    })
    await testApiHandler({
      appHandler: updateBookHandler,
      test: async ({ fetch }) => {
        const res = await fetch(
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              id: "RECORD_ID", title: 'lotr', author: 'tolkien', isbn: 'whatever', userId: 'my-user-id'
            }),
          }
        )

        expect(await res.json()).toEqual({ error: 'test error!' });
        expect(res.status).toBe(500)
      }
    })
  })

  it('requires userId field', async () => {
    await testApiHandler({
      appHandler: updateBookHandler,
      test: async ({ fetch }) => {
        const res = await fetch(
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              id: "RECORD_ID", title: 'lotr', author: 'tolkien', isbn: 'whatever'
            }),

          }
        )

        expect(await res.json()).toEqual({ error: 'No user found!' });
        expect(res.status).toBe(500)
      }
    })
  })

  it('requires title field', async () => {
    await testApiHandler({
      appHandler: updateBookHandler,
      test: async ({ fetch }) => {
        const res = await fetch(
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              id: "RECORD_ID", author: 'tolkien', isbn: 'whatever', userId: 'my-user-id'
            }),

          }
        )

        expect(await res.json()).toEqual({ error: 'No title found!' });
        expect(res.status).toBe(500)
      }
    })
  })

  it('requires id field', async () => {
    await testApiHandler({
      appHandler: updateBookHandler,
      test: async ({ fetch }) => {
        const res = await fetch(
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              title: "lotr", author: 'tolkien', isbn: 'whatever', userId: 'my-user-id'
            }),

          }
        )

        expect(await res.json()).toEqual({ error: 'No book id!' });
        expect(res.status).toBe(500)
      }
    })
  })
})