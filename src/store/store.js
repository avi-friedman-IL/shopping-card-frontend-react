import { legacy_createStore as createStore, combineReducers } from 'redux'

import { shopReducer } from './reducers/shop.reducer'
import { userReducer } from './reducers/user.reducer'

const rootReducer = combineReducers({
    shopModule: shopReducer,
    userModule: userReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })