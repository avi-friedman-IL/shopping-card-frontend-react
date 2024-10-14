import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router'

import './assets/style/main.scss'

import { store } from './store/store'
import { ShopIndex } from './pages/ShopIndex'
import { HomePage } from './pages/HomePage'
import { AppHeader } from './cmps/AppHeader'
import { CartIndex } from './cmps/CartIndex'
import { ShopEdit } from './pages/ShopEdit'
import { UserMsg } from './cmps/UserMsg'
import { ShopDetails } from './pages/ShopDetails'

export function RootCmp() {
  return (
    <Provider store={store}>
      <AppHeader />
      <main className='main-layout'>
      <UserMsg />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='shop' element={<ShopIndex />}>
            <Route path='shop/edit' element={<ShopEdit />} />
            <Route path='shop/edit/:productId' element={<ShopEdit />} />
          </Route>
          <Route path='shop/:productId' element={<ShopDetails />} />
          <Route path='shop/cart' element={<CartIndex />} />
        </Routes>
      </main>
    </Provider>
  )
}
