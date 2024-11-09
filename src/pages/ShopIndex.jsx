import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { ShopList } from '../cmps/ShopList'
import { loadShops, removeShop } from '../store/actions/shop.actions'
import { updateUser } from '../store/actions/user.actions'
import { userService } from '../services/user'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ShopHeader } from '../cmps/ShopHeader'
import { ShopFilter } from '../cmps/ShopFilter'

export function ShopIndex() {
   const user = useSelector(state => state.userModule.user)
   const products = useSelector(state => state.shopModule.products)
   const filterBy = useSelector(state => state.shopModule.filterBy)
   const reviews = useSelector(state => state.reviewModule.reviews)

   useEffect(() => {
      load()
   }, [products?.length, filterBy, reviews.length])

   async function load() {
      await loadShops(filterBy)
   }

   async function onRemoveShop(shopId) {
      try {
         await removeShop(shopId)
         showSuccessMsg('Product removed successfully')
      } catch (err) {
         console.log('Cannot remove product', err)
         showErrorMsg('Cannot remove product')
      }
   }

   async function addToCart(product) {
      if (!user) return
      try {
         const currUser = await userService.getById(user._id)
         console.log('currUser:', currUser)
         const cart = currUser.cart
         const cartToSave = cart?.length ? [...cart, product] : [product]
         const userToUpdate = { ...currUser, cart: cartToSave }
         await updateUser(userToUpdate)
         showSuccessMsg('Product added to cart')
      } catch (err) {
         console.log('Cannot add to cart', err)
         showErrorMsg('Cannot add to cart')
      }
   }
   return (
      <section className='shop-index'>
         <ShopHeader />
         <ShopList
            products={products}
            onRemoveShop={onRemoveShop}
            addToCart={addToCart}
         />
         {/* <ShopList
            products={products}
            onRemoveShop={onRemoveShop}
            addToCart={addToCart}
         /> */}
         <ShopFilter />
         <Outlet />
      </section>
   )
}
