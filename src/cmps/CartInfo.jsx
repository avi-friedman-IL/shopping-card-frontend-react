export function CartInfo({ cart }) {
    const total = cart.reduce((acc, product) => acc + product.price, 0)
    return (
        <section className='cart-info'>
           <p>Number of products in cart: <span>{cart.length}</span></p>
           <p>Total to be paid: <span>{total}$</span></p>
           <button>buy now</button>
        </section>
    )
}