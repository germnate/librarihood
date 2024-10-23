/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t3ndhiatfxd5xpf")

  collection.name = "books"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t3ndhiatfxd5xpf")

  collection.name = "Books"

  return dao.saveCollection(collection)
})
