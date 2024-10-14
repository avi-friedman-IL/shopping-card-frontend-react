import { httpService } from '../http.service'
export const shopService = {
   query,
   getById,
   save,
   remove,
}
const CLOUD_KEY = '929267318661154'
const CLOUD_SECRET = 'F488b_zzRLS3Sh2Efrfr-8_oHLI'

async function query(filterBy = {}) {
   console.log('filterBy:', filterBy)
   return httpService.get(`shop`, filterBy)
}

function getById(shopId) {
   return httpService.get(`shop/${shopId}`)
}

async function remove(shopId) {
   return httpService.delete(`shop/${shopId}`)
}

async function save(shop) {
   var savedShop
   if (shop._id) {
      savedShop = await httpService.put(`shop/${shop._id}`, shop)
   } else {
      savedShop = await httpService.post('shop', shop)
   }
   return savedShop
}
