import { Link } from 'react-router-dom'
import { CartPreview } from './CartPreview'
import { IoMdArrowRoundBack } from 'react-icons/io'

export function CartList({ cart, onRemove }) {
   if (!cart.length) return <h2>Your cart is empty</h2>
   return (
      <ul className='cart-list'>
         <Link to='/shop'>
            <IoMdArrowRoundBack />
         </Link>
         {cart.map((product, idx) => (
            <CartPreview key={idx} product={product} onRemove={onRemove} />
         ))}
      </ul>
   )
}
