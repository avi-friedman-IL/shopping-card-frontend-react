export const SET_SHOP = 'SET_SHOP'
export const REMOVE_SHOP = 'REMOVE_SHOP'
export const ADD_SHOP = 'ADD_SHOP'
export const UPDATE_SHOP = 'UPDATE_SHOP'
export const SET_FILTER = 'SET_FILTER'
export const SET_LOADING = 'SET_LOADING'

const initialState = {
   products: [],
   filterBy: {},
   isLoading: false,
}

export function shopReducer(state = initialState, action) {
   var newState = state
   var products
   switch (action.type) {
      case SET_SHOP:
         newState = { ...state, products: action.products }
         break
      case REMOVE_SHOP:
         const lastRemovedShop = state.products.find(
            product => product._id === action.shopId
         )
         products = state.products.filter(
            product => product._id !== action.shopId
         )
         newState = { ...state, products, lastRemovedShop }
         break
      case ADD_SHOP:
         newState = { ...state, products: [...state.products, action.product] }
         break
      case UPDATE_SHOP:
         products = state.products.map(product =>
            product._id === action.product._id ? action.product : product
         )
         newState = { ...state, products }
         break
      case SET_FILTER:
         newState = { ...state, filterBy: action.filterBy }
         break
      case SET_LOADING:
         newState = { ...state, isLoading: action.isLoading }
         break
      default:
         state
   }
   return newState
}

// unitTestReducer()

function unitTestReducer() {
   var state = initialState
   const shop1 = {
      _id: 'b101',
      title: 'product ' + parseInt(Math.random() * 10),
      msgs: [],
   }
   const shop2 = {
      _id: 'b102',
      title: 'product ' + parseInt(Math.random() * 10),
      msgs: [],
   }

   state = shopReducer(state, { type: SET_SHOPS, products: [shop1] })
   console.log('After SET_SHOPS:', state)

   state = shopReducer(state, { type: ADD_SHOP, product: shop2 })
   console.log('After ADD_SHOP:', state)

   state = shopReducer(state, {
      type: UPDATE_SHOP,
      product: { ...shop2, title: 'Good' },
   })
   console.log('After UPDATE_SHOP:', state)

   state = shopReducer(state, { type: REMOVE_SHOP, shopId: shop2._id })
   console.log('After REMOVE_SHOP:', state)

   const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
   state = shopReducer(state, { type: ADD_SHOP_MSG, shopId: shop1._id, msg })
   console.log('After ADD_SHOP_MSG:', state)

   state = shopReducer(state, { type: REMOVE_SHOP, shopId: shop1._id })
   console.log('After REMOVE_SHOP:', state)
}
