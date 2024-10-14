import { RiDeleteBin5Line } from 'react-icons/ri'

export function CartPreview({ product, onRemove }) {
   return (
      <li className='cart-preview'>
         <div className='info'>
            <h2>{product.price}$</h2>
            <h1>{product.name}</h1>
            <button
               className='remove-btn'
               onClick={() => onRemove(product._id)}>
               <span>
                  <RiDeleteBin5Line />
               </span>
               <h2>Remove</h2>
            </button>
         </div>
         <img src={product.image_url} alt={product.name} />
      </li>
   )
}
