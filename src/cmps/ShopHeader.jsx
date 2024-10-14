import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export function ShopHeader() {
   const user = useSelector(state => state.userModule.user)
   return (
      <header className='shop-header'>
         <p className='user-icon'>{user?.fullname[0].toUpperCase()}</p>
         <Link to={'/shop/cart'}>
            {user?.cart?.length > 0 && <span>{user?.cart?.length}</span>}
            <FaShoppingCart />
         </Link>
         {user?.isAdmin && <Link to={'shop/edit'}>Add product</Link>}
      </header>
   )
}
