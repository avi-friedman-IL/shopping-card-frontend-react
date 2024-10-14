import { useSelector } from "react-redux"

import { CartList } from "./CartList"
import { userService } from "../services/user"
import { updateUser } from "../store/actions/user.actions"
import { CartInfo } from "./CartInfo"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function CartIndex() {
    const user = useSelector(state => state.userModule.user)
    const cart = user?.cart

   async function onRemove(productId) {
        try {
            const currUser = await userService.getById(user._id)
            const cart = currUser.cart
            const cartToSave = cart.filter(product => product._id !== productId)
            const userToUpdate = { ...currUser, cart: cartToSave }
            await updateUser(userToUpdate)
            showSuccessMsg('Product removed from cart')
        } catch (err) {
            console.log('Cannot remove from cart', err)
            showErrorMsg('Cannot remove from cart')
        }
    }
    
    if(!user) return <h1>Log in to view your cart</h1>
    return (
        <section className="cart-index">
           <CartList cart={cart} onRemove={onRemove} />
           <CartInfo cart={cart} />
        </section>
    )
}