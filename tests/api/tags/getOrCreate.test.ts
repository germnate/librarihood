import { testApiHandler } from 'next-test-api-route-handler'
import * as getOrCreateTagHandler from "@/app/api/tags/getOrCreate/route";
import * as tagsLib from '@/app/lib/tags'
import { TagsRecord } from '../../../pocketbase-types';

describe('getOrCreate tag', () => {
  let getOrCreateSpy: jest.SpyInstance;
  beforeEach(() => {
    getOrCreateSpy = jest.spyOn(tagsLib, 'getOrCreateTags').mockImplementation(
      (tags: Array<TagsRecord>) => {
        return Promise.resolve([
          { id: 'tag1', name: 'paperback', book: 'bookId' },
          { id: 'tag2', name: 'hardcover' }
        ])
      }
    )
  })

  it('responds with tags object', async () => {
    await testApiHandler({
      appHandler: getOrCreateTagHandler,
      test: async ({ fetch }) => {
        const res = await fetch(
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify([
              { id: 'tag1', name: 'paperback', book: 'bookId' },
              { id: null, name: 'hardcover' }
            ]),

          }
        )
        expect(await res.json()).toStrictEqual({
          tags: [
            { id: 'tag1', name: 'paperback', book: 'bookId' },
            { id: 'tag2', name: 'hardcover' }
          ]
        });
      }
    })
  })
})