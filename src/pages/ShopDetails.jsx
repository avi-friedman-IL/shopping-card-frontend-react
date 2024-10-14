import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

export function ShopDetails() {
   const { productId } = useParams()
   const products = useSelector(state => state.shopModule.products)
   const [product, setProduct] = useState(null)

   useEffect(() => {
      setProduct(products.find(product => product._id === productId))
   }, [productId])
   if (!product) return <div>Loading...</div>
   return (
      <section className='shop-details'>
         <img src={product.image_url} alt='' />
         <h1>{product.name}</h1>
         <p>price: {product.price}</p>
      </section>
   )
}
