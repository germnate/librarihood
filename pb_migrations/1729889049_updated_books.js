/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t3ndhiatfxd5xpf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cixbcn5x",
    "name": "tags",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "y301va5z5pdqmr6",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t3ndhiatfxd5xpf")

  // remove
  collection.schema.removeField("cixbcn5x")

  return dao.saveCollection(collection)
})
