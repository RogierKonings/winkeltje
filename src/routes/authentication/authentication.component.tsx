import * as React from 'react'
import SignInForm from 'src/components/sign-in-form/sign-in-form.component'
import SignUpForm from 'src/components/sign-up-form/sign-up-form.component'
import {AuthenticationContainer} from './authentication.styles'

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  )
}

export default Authentication
