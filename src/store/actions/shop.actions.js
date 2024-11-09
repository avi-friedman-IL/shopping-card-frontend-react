import { shopService } from '../../services/shop'
import { store } from '../store'
import {
   ADD_SHOP,
   REMOVE_SHOP,
   SET_SHOP,
   UPDATE_SHOP,
   SET_FILTER,
   SET_LOADING,
} from '../reducers/shop.reducer'

export async function loadShops(filterBy = {}) {
   store.dispatch({ type: SET_LOADING, isLoading: true })
   try {
      const products = await shopService.query(filterBy)
      store.dispatch(getCmdSetShop(products))
      return products
   } catch (err) {
      console.log('Cannot load products', err)
      throw err
   } finally {
      store.dispatch({ type: SET_LOADING, isLoading: false })
   }
}

export async function loadShopById(shopId) {
   try {
      const product = await shopService.getById(shopId)
      return product
   } catch (err) {
      console.log('Cannot load product', err)
      throw err
   }
}

export async function removeShop(shopId) {
   try {
      await shopService.remove(shopId)
      store.dispatch(getCmdRemoveShop(shopId))
   } catch (err) {
      console.log('Cannot remove product', err)
      throw err
   }
}

export async function addShop(product) {
   try {
      const savedShop = await shopService.save(product)
      store.dispatch(getCmdAddShop(savedShop))
      return savedShop
   } catch (err) {
      console.log('Cannot add product', err)
      throw err
   }
}

export async function updateShop(product) {
   try {
      const savedShop = await shopService.save(product)
      store.dispatch(getCmdUpdateShop(savedShop))
   } catch (err) {
      console.log('Cannot save product', err)
      throw err
   }
}

export function setFilter(filterBy) {
   store.dispatch({ type: SET_FILTER, filterBy })
}


// Command Creators:
function getCmdSetShop(products) {
   return {
      type: SET_SHOP,
      products,
   }
}
function getCmdRemoveShop(shopId) {
   return {
      type: REMOVE_SHOP,
      shopId,
   }
}
function getCmdAddShop(product) {
   return {
      type: ADD_SHOP,
      product,
   }
}
function getCmdUpdateShop(product) {
   return {
      type: UPDATE_SHOP,
      product,
   }
}

// unitTestActions()
async function unitTestActions() {
   await loadShops()
   await addShop(shopService.getEmptyShop())
   await updateShop({
      _id: 'm1oC7',
      title: 'product-Good',
   })
   await removeShop('m1oC7')
   // TODO unit test addShopMsg
}
