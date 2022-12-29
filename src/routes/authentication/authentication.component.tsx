import * as React from 'react'
import SignInForm from 'src/components/sign-in-form/sign-in-form.component'
import SignUpForm from 'src/components/sign-up-form/sign-up-form.component'
import {createUserDocumentFromAuth, signInWithGooglePopup} from '../../utils/firebase/firebase.utils'

const Authentication = () => {
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <SignInForm></SignInForm>
      <SignUpForm></SignUpForm>
    </div>
  )
}

export default Authentication
