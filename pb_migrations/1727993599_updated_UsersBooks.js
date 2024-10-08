/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("toma13niacu8fbq")

  collection.name = "UserBooks"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("toma13niacu8fbq")

  collection.name = "UsersBooks"

  return dao.saveCollection(collection)
})
