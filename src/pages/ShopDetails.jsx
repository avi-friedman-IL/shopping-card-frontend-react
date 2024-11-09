import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { ReviewIndex } from '../cmps/ReviewIndex'
import { loadShops } from '../store/actions/shop.actions'
import { loadReviews } from '../store/actions/review.actions'
import { loadUsers } from '../store/actions/user.actions'
import { IoMdArrowRoundBack } from 'react-icons/io'

export function ShopDetails() {
   const { productId } = useParams()
   const navigate = useNavigate()

   const userId = useSelector(state => state.userModule.user?._id)
   const products = useSelector(state => state.shopModule.products)
   const reviews = useSelector(state => state.reviewModule.reviews)
   const users = useSelector(state => state.userModule.users)

   const [product, setProduct] = useState(null)
   const [isAddingReview, setIsAddingReview] = useState(false)

   useEffect(() => {
      load()
   }, [productId, products, reviews.length, userId])

   async function load() {
      if (!products?.length) loadShops()
      if (!users?.length) loadUsers()
      const currProduct = products.find(product => product._id === productId)
      setProduct(currProduct)
      loadReviews({ productId })
   }

   if (!product) return <div>Loading...</div>
   return (
      <section className='shop-details'>
         <button className='back-btn' onClick={() => navigate(-1)}><IoMdArrowRoundBack /></button>
         <img src={product.image_url} alt='' />
         <h1>{product.name}</h1>
         <p>price: {product.price}</p>

         {userId && (
            <button
               className='add-review-btn'
               onClick={() => setIsAddingReview(true)}>
               Add review
            </button>
         )}
         {isAddingReview && (
            <ReviewIndex
               byUserId={userId}
               product={product}
               setIsAddingReview={setIsAddingReview}
            />
         )}

         {reviews && users && (
            <ul className='reviews'>
               {reviews.map(review => (
                  <li key={review._id}>
                     <p className='txt'>{review.txt}</p>
                     <p className='by'>
                        by:{' '}
                        {
                           users?.find(user => user._id === review.byUserId)
                              .fullname || ''
                        }
                     </p>
                     <p className='created-at'>
                        created at:{' '}
                        {new Date(review.createdAt).toDateString() || ''}
                     </p>
                  </li>
               ))}
            </ul>
         )}
      </section>
   )
}
