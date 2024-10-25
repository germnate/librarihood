import { testApiHandler } from 'next-test-api-route-handler'
import * as indexBookHandler from "@/app/api/books/index/route";
import * as booksLib from "@/app/lib/books";
import { BooksRecord } from '../../../pocketbase-types';
import { RecordModel } from 'pocketbase';

const book: RecordModel = {
  id: 'some-book',
  title: 'Some Book',
  authors: ['One Author'],
  publisher: 'publisher',
  publishedDate: '1980',
  collectionName: 'books',
  collectionId: 'books-id',
  created: '2022-10-10',
  updated: '2022-10-10',
  tags: ['Fantasy']
}
const anotherBook: RecordModel = {
  ...book,
  id: 'another-book',
  title: 'Another',
  tags: ['Non-fiction'],
}

describe('index', () => {
  let indexSpy = jest.spyOn(booksLib, 'getBooks')
    .mockImplementation(() => Promise.resolve(
      [
        book,
        anotherBook
      ]
    ))

  it('gets books', async () => {
    await testApiHandler({
      appHandler: indexBookHandler,
      test: async ({ fetch }) => {
        const res = await fetch(
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              userId: 'some-user',
              tokens: ['Some Book', 'Some', 'Book']
            }),

          }
        )
        expect(indexSpy).toHaveBeenCalledWith("userId = 'some-user' and (authors[] ~ Some Book || authors[] ~ Some || authors[] ~ Book || tags[] ~ Some Book || tags[] ~ Some || tags[] ~ Book || categories[] ~ Some Book || categories[] ~ Some || categories[] ~ Book || title ~ Some Book || title ~ Some || title ~ Book || publisher ~ Some Book || publisher ~ Some || publisher ~ Book || publishedDate ~ Some Book || publishedDate ~ Some || publishedDate ~ Book || isbn ~ Some Book || isbn ~ Some || isbn ~ Book)")
        expect(await res.json()).toStrictEqual({ books: [book, anotherBook] })
      }
    })
  })
})