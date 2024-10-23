/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t3ndhiatfxd5xpf")

  // remove
  collection.schema.removeField("a6l9nypn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ke3fn6zx",
    "name": "smallThumbnail",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "myh7g7rh",
    "name": "thumbnail",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
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

  // remove
  collection.schema.removeField("ke3fn6zx")

  // remove
  collection.schema.removeField("myh7g7rh")

  return dao.saveCollection(collection)
})
