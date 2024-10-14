import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { addShop, updateShop } from '../store/actions/shop.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function ShopEdit() {
   const { productId } = useParams()
   const navigate = useNavigate()
   var product

   if (productId) {
      product = useSelector(state =>
         state.shopModule.products.find(product => product._id === productId)
      )
   } else product = { name: '', price: '', image_url: '' }

   const [productCopy, setProductCopy] = useState({ ...product })

   function handleChange({ target }) {
      const field = target.name
      const value = target.type === 'number' ? +target.value : target.value
      setProductCopy(prevState => ({ ...prevState, [field]: value }))
   }

   async function onSaveProduct() {
      try {
         if (productId) await updateShop(productCopy)
         else await addShop(productCopy)
         showSuccessMsg('Product saved successfully')
      } catch (err) {
         console.log('Cannot save product', err)
         showErrorMsg('Cannot save product')
      } finally {
         navigate('/shop')
      }
   }

   return (
      <section className='shop-edit'>
         <h1>Shop Edit</h1>
         <form className='form' onSubmit={ev => ev.preventDefault()}>
            <label htmlFor='name'>Name:</label>
            <input
               type='text'
               id='name'
               name='name'
               value={productCopy.name}
               onChange={handleChange}
            />
            <label htmlFor='price'>Price:</label>
            <input
               type='number'
               id='price'
               name='price'
               value={productCopy.price}
               onChange={handleChange}
            />
            <label htmlFor='image_url'>Image URL:</label>
            <input
               type='text'
               id='image_url'
               name='image_url'
               value={productCopy.image_url}
               onChange={handleChange}
            />
            <button onClick={onSaveProduct}>Save</button>
         </form>
      </section>
   )
}
