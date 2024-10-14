import { storageService } from '../async-storage.service'

const STORAGE_KEY = 'product'

export const shopService = {
   query,
   getById,
   save,
   remove,
}
window.cs = shopService

async function query(filterBy = { txt: '' }) {
   var products = await storageService.query(STORAGE_KEY)

   if (!products || !products.length) {
      products = await _createShops()
      storageService.saveToStorage(STORAGE_KEY, products)
   }
   return products
}

async function getById(shopId) {
   const product = await storageService.get(STORAGE_KEY, shopId)

   return product
}

async function remove(shopId) {
   // throw new Error('Nope')
   await storageService.remove(STORAGE_KEY, shopId)
}

async function save(product) {
   var savedShop
   if (product._id) {
      savedShop = await storageService.put(STORAGE_KEY, product)
   } else {
      savedShop = await storageService.post(STORAGE_KEY, product)
   }
   return savedShop
}

async function _createShops() {
   return [
      {
         _id: 1,
         name: 'Wireless Headphones',
         imgUrl: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439',
         price: 59.99,
      },
      {
         _id: 2,
         name: 'Smartphone',
         imgUrl: 'https://images.unsplash.com/photo-1512499617640-c2f999a60713',
         price: 499.99,
      },
      {
         _id: 3,
         name: '4K TV',
         imgUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
         price: 799.99,
      },
      {
         _id: 4,
         name: 'Smartwatch',
         imgUrl: 'https://images.unsplash.com/photo-1517430816045-df4b7de01f17',
         price: 199.99,
      },
      {
         _id: 5,
         name: 'Gaming Laptop',
         imgUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
         price: 1199.99,
      },
      {
         _id: 6,
         name: 'Bluetooth Speaker',
         imgUrl: 'https://images.unsplash.com/photo-1495733715281-025e5d55b2e1',
         price: 89.99,
      },
      {
         _id: 7,
         name: 'Digital Camera',
         imgUrl: 'https://images.unsplash.com/photo-1519183071298-a2962f29a323',
         price: 329.99,
      },
      {
         _id: 8,
         name: 'Tablet',
         imgUrl: 'https://images.unsplash.com/photo-1510557880182-3b367a9e1e26',
         price: 299.99,
      },
   ]
}
