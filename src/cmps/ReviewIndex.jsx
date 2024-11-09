import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { addReview } from '../store/actions/review.actions'

export function ReviewIndex({ byUserId, product, setIsAddingReview }) {
   const [review, setReview] = useState({})

   async function handleChange(ev) {
      const { value } = ev.target
      console.log('value:', value)
      setReview({ txt: value, byUserId, productId: product._id, createdAt: Date.now() })
   }

   async function onSave(ev) {
      ev.preventDefault()
      if (!review.txt) return setIsAddingReview(false)
      try {
         await addReview(review)
         showSuccessMsg('Review saved successfully')
      } catch (err) {
         console.log('Cannot save review', err)
         showErrorMsg('Cannot save review')
      } finally {
         setIsAddingReview(false)
      }
   }

   return (
      <form className='review-index' onSubmit={onSave}>
         <textarea
            id='txt'
            name='txt'
            rows='4'
            cols='50'
            placeholder='Write your review here...'
            onChange={handleChange}></textarea>
         <button>Submit</button>
      </form>
   )
}
