import { reviewService } from "../../services/review/review.service"
import { ADD_REVIEW, REMOVE_REVIEW, SET_REVIEWS } from "../reducers/review.reducer"
import { store } from "../store"

export async function loadReviews(filterBy = {}) {
   try {
      const reviews = await reviewService.query(filterBy)
      store.dispatch(getCmdSetReviews(reviews))
      return reviews
   } catch (err) {
      console.log('Cannot load reviews', err)
      throw err
   }
}

export async function removeReview(reviewId) {
   try {
      await reviewService.remove(reviewId)
      store.dispatch(getCmdRemoveReview(reviewId))
   } catch (err) {
      console.log('Cannot remove review', err)
      throw err
   }
}

export async function addReview(review) {
   try {
      const savedReview = await reviewService.save(review)
      store.dispatch(getCmdAddReview(savedReview))
      return savedReview
   } catch (err) {
      console.log('Cannot add review', err)
      throw err
   }
}

export function getCmdSetReviews(reviews) {
   return { type: SET_REVIEWS, reviews }
}

export function getCmdRemoveReview(reviewId) {
   return { type: REMOVE_REVIEW, reviewId }
}

export function getCmdAddReview(review) {
   return { type: ADD_REVIEW, review }
}