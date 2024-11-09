import { BiSolidCartAdd } from 'react-icons/bi'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export function ShopPreview({ product, onRemoveShop, addToCart }) {
   const user = useSelector(state => state.userModule.user)
   const isInCart = user?.cart?.some(item => item._id === product._id)
   return (
      <li
         className='shop-preview'
         style={{ backgroundImage: `url(${product.image_url})` }}
         >
         <Link to={`/shop/${product._id}`}>
            <div className='info'>
               <h2>{product.name}</h2>
               <span>{product.price}$</span>
            </div>
         </Link>

         <div className='btns'>
            {!isInCart && (
               <button onClick={() => addToCart(product)}>
                  <BiSolidCartAdd />
               </button>
            )}
            {isInCart && (
               <Link to={'/shop/cart'}>
                  <FaShoppingCart />
               </Link>
            )}
            {user?.isAdmin && <Link to={`shop/edit/${product._id}`}>Edit</Link>}
            {user?.isAdmin && (
               <button onClick={() => onRemoveShop(product._id)}>Remove</button>
            )}
         </div>
      </li>
   )
}
