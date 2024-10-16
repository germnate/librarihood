/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t3ndhiatfxd5xpf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a6l9nypn",
    "name": "coverUrl",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t3ndhiatfxd5xpf")

  // remove
  collection.schema.removeField("a6l9nypn")

  return dao.saveCollection(collection)
})
