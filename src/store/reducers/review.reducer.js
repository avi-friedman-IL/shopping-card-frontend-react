export const SET_REVIEWS = 'SET_REVIEWS'
export const ADD_REVIEW = 'ADD_REVIEW'
export const REMOVE_REVIEW = 'REMOVE_REVIEW'

const initialState = {
   reviews: [],
}

export function reviewReducer(state = initialState, action) {
   var newState = state
   switch (action.type) {
      case SET_REVIEWS:
         newState = { ...state, reviews: action.reviews }
         break
      case ADD_REVIEW:
         newState = { ...state, reviews: [...state.reviews, action.review] }
         break
      case REMOVE_REVIEW:
         newState = {
            ...state,
            reviews: state.reviews.filter(
               review => review.id !== action.reviewId
            ),
         }
         break
        default:
            return state
            
   }
   return newState
}
