import { ShopPreview } from './ShopPreview'

export function ShopList({ products, onRemoveShop, addToCart }) {
   return (
      <ul className='product-list'>
         {products.map(product => (
            <ShopPreview
               key={product._id}
               product={product}
               onRemoveShop={onRemoveShop}
               addToCart={addToCart}
            />
         ))}
      </ul>
   )
}
