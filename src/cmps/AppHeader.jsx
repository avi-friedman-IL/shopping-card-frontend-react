import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LoginSignup } from './LoginSignup'
import { useSelector } from 'react-redux'
import { logout } from '../store/actions/user.actions'

export function AppHeader() {
   const user = useSelector(state => state.userModule.user)
   const [isLogin, setIsLogin] = useState(false)

   async function onLogout() {
      await logout()
   }

   return (
      <header className='app-header'>
         <nav className='app-nav'>
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/shop'}>Shopping</NavLink>
         </nav>
         <section className='login'>
            {!user && (
               <button className='login' onClick={() => setIsLogin(true)}>
                  Login
               </button>
            )}
            {user && (
               <button className='login' onClick={onLogout}>
                  Logout
               </button>
            )}
            {isLogin && <LoginSignup setIsLogin={setIsLogin} />}
         </section>
      </header>
   )
}
