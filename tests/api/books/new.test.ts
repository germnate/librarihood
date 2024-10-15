import { testApiHandler } from 'next-test-api-route-handler'
import * as newBookHandler from "@/app/api/books/new/route";
import * as booksLib from "@/app/lib/books";
import { Book } from "@/app/types/book";

describe('POST new book', () => {
  let createBookSpy: jest.SpyInstance;
  beforeEach(() => {
    createBookSpy = jest.spyOn(booksLib, 'createBook').mockImplementation(
      (b: Book) => {
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
    createBookSpy.mockRestore();
  })

  it('accepts a post request and creates a book', async () => {
    await testApiHandler({
      appHandler: newBookHandler,
      test: async ({ fetch }) => {
        const res = await fetch(
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              title: 'lodr', author: 'tolkien', isbn: 'whatever', userId: 'my-user-id'
            }),

          }
        )
        expect(await res.json()).toStrictEqual({ bookId: 'RECORD_ID' });
      }
    })
  })

  it('handles errors', async () => {
    createBookSpy.mockImplementation(() => {
      throw new Error('test error!');
    })
    await testApiHandler({
      appHandler: newBookHandler,
      test: async ({ fetch }) => {
        const res = await fetch(
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              title: 'lodr', author: 'tolkien', isbn: 'whatever', userId: 'my-user-id'
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
      appHandler: newBookHandler,
      test: async ({ fetch }) => {
        const res = await fetch(
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              title: 'lodr', author: 'tolkien', isbn: 'whatever'
            }),

          }
        )

        expect(await res.json()).toEqual({ error: 'No user found!' });
        expect(res.status).toBe(500)
      }
    })
  })
})