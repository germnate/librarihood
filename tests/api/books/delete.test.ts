import { testApiHandler } from 'next-test-api-route-handler'
import * as deleteBookHandler from "@/app/api/books/delete/route";
import * as booksLib from "@/app/lib/books";
import { Book } from "@/app/types/book";

describe('POST delete book', () => {
  let deleteBookSpy: jest.SpyInstance;
  beforeEach(() => {
    deleteBookSpy = jest.spyOn(booksLib, 'deleteBook').mockImplementation(
      (id: string) => {
        return Promise.resolve(true);
      })
  })

  afterEach(() => {
    deleteBookSpy.mockRestore();
  })

  it('succeeds', async () => {
    await testApiHandler({
      appHandler: deleteBookHandler,
      test: async ({ fetch }) => {
        const res = await fetch(
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              id: 'some-book-id'
            }),

          }
        )
        expect(await res.json()).toEqual({ success: true });
        expect(res.status).toBe(200)
      }
    })
  })

  it('throws an error if no id is present', async () => {
    await testApiHandler({
      appHandler: deleteBookHandler,
      test: async ({ fetch }) => {
        const res = await fetch(
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              noIdKey: '',
            }),

          }
        )
        expect(await res.json()).toEqual({ error: 'No book id!' });
        expect(res.status).toBe(500)
      }
    })
  })
})