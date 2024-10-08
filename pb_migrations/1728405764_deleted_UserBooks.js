/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("toma13niacu8fbq");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "toma13niacu8fbq",
    "created": "2024-10-03 06:51:02.868Z",
    "updated": "2024-10-03 22:13:19.672Z",
    "name": "UserBooks",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rlvjk65q",
        "name": "userId",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "y4vxkn5w",
        "name": "bookId",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "t3ndhiatfxd5xpf",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
