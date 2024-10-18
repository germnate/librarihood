import { testApiHandler } from 'next-test-api-route-handler'
import * as fetchBookHandler from "@/app/api/books/fetch/route";
import * as googleApi from '@/app/external_api/google-book';
import { Book } from "@/app/types/book";

describe('GET fetch book from google api', () => {
  let query: jest.SpyInstance;
  beforeEach(() => {
    query = jest.spyOn(googleApi, 'executeQuery').mockImplementation(
      (isbn: string) => {
        return Promise.resolve(new Response(JSON.stringify({ title: 'lotr', author: 'j.r.r. tolkien' }), {
          status: 200,
          headers: { 'content-type': 'application/json' }
        }));
      })
  })

  afterEach(() => {
    query.mockRestore();
  })

  it('rejects invalid isbns', async () => {
    await testApiHandler({
      appHandler: fetchBookHandler,
      url: 'www.some-url-with-param.com?q=isbn:10',
      test: async ({ fetch }) => {
        const res = await fetch()
        expect(await res.json()).toEqual({ error: 'This function requires a valid isbn' });
        expect(res.status).toBe(500)
      }
    })
    await testApiHandler({
      appHandler: fetchBookHandler,
      url: 'www.some-url-with-param.com',
      test: async ({ fetch }) => {
        const res = await fetch()
        expect(await res.json()).toEqual({ error: 'This function requires a valid isbn' });
        expect(res.status).toBe(500)
      }
    })
  })

  it('accepts isbns10', async () => {
    await testApiHandler({
      appHandler: fetchBookHandler,
      url: 'www.some-url-with-param.com?isbn=0395974682',
      test: async ({ fetch }) => {
        const res = await fetch()
        expect(res.status).toBe(200)
        expect(query).toHaveBeenCalled();
      }
    })
  })

  it('accepts isbns13', async () => {
    await testApiHandler({
      appHandler: fetchBookHandler,
      url: 'www.some-url-with-param.com?isbn=978-0590353427',
      test: async ({ fetch }) => {
        const res = await fetch()
        expect(res.status).toBe(200)
        expect(query).toHaveBeenCalled();
      }
    })
  })

  describe('validIsbn13', () => {
    it.only('works', () => {
      expect(!!fetchBookHandler.validIsbn13('978-0590353427')).toBe(true);
      expect(!!fetchBookHandler.validIsbn13('9780590353427')).toBe(true);
    })
  })
})