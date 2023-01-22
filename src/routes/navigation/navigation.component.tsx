import * as React from 'react'
import {useContext} from 'react'
import {Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {LogoContainer, NavigationContainer, NavLink, NavLinks} from './navigation.styles'

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import {signOutUser} from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import {CartContext} from '../../context/cart.context'
import {selectCurrentUser} from 'src/store/user/user.selector'

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)

  const {isCartOpen} = useContext(CartContext)

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo>Logo</CrwnLogo>
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  )
}

export default Navigation
