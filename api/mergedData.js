import { getSingleItem, deleteItem } from './itemData';
import { getSingleList, deleteSingleList, getListItems } from './listData';

const viewItemDetails = (itemFirebaseKey) => new Promise((resolve, reject) => {
  getSingleItem(itemFirebaseKey)
    .then((itemObject) => {
      getSingleList(itemObject.list_id)
        .then((listObject) => {
          resolve({ listObject, ...itemObject });
        });
    }).catch((error) => reject(error));
});

const deleteListItems = (listId) => new Promise((resolve, reject) => {
  getListItems(listId).then((itemsArray) => {
    const deleteItemPromises = itemsArray.map((item) => deleteItem(item.itemFirebaseKey));

    Promise.all(deleteItemPromises).then(() => {
      deleteSingleList(listId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const viewListDetails = (listFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleList(listFirebaseKey), getListItems(listFirebaseKey)])
    .then(([listObject, listItemsArray]) => {
      resolve({ ...listObject, items: listItemsArray });
    }).catch((error) => reject(error));
});

export { viewItemDetails, deleteListItems, viewListDetails };
