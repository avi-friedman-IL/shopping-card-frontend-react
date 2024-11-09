import { httpService } from "../http.service"

export const reviewService = {
   query,
   remove,
   save,
}

function query(filterBy = {}) {
   return httpService.get('review', filterBy)
}
function remove(reviewId) {
   return httpService.delete(`review/${reviewId}`)
}
function save(review) {
   if (review._id) {
      return httpService.put(`review/${review._id}`, review)
   } else {
      return httpService.post('review', review)
   }
}
