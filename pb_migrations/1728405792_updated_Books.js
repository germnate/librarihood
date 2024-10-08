/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t3ndhiatfxd5xpf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z5lftvix",
    "name": "userId",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t3ndhiatfxd5xpf")

  // remove
  collection.schema.removeField("z5lftvix")

  return dao.saveCollection(collection)
})
