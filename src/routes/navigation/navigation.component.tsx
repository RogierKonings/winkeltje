import * as React from 'react'
import {Outlet} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {LogoContainer, NavigationContainer, NavLink, NavLinks} from './navigation.styles'

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import {selectCurrentUser} from 'src/store/user/user.selector'
import {selectIsCartOpen} from 'src/store/cart/cart.selector'
import {signOutStart} from 'src/store/user/user.reducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

  const signOutUser = () => dispatch(signOutStart())

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
