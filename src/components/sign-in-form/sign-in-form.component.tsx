import * as React from 'react'
import {useState} from 'react'
import {getErrorMessage} from 'src/utils/firebase/firebase-error.utils'
import {signInAuthUserWithEmailAndPassword, signInWithGooglePopup} from 'src/utils/firebase/firebase.utils'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import FormInput from '../form-input/form-input.component'
import {ButtonsContainer, Header, SignInContainer} from './sign-in-form.styles'

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {email, password} = formFields

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const {name, value} = event.target as any

    setFormFields({...formFields, [name]: value})
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await signInAuthUserWithEmailAndPassword(email, password)
      resetFormFields()
    } catch (error) {
      alert(getErrorMessage(error.code))
    }
  }

  return (
    <SignInContainer>
      <Header>Already have an account?</Header>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
}

export default SignInForm
