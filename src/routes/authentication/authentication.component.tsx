import * as React from 'react'
import SignInForm from 'src/components/sign-in-form/sign-in-form.component'
import SignUpForm from 'src/components/sign-up-form/sign-up-form.component'

import './authentication.styles.scss'

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm></SignInForm>
      <SignUpForm></SignUpForm>
    </div>
  )
}

export default Authentication
