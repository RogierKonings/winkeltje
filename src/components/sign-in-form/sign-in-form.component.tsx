import * as React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {emailSignInStart, googleSignInStart} from 'src/store/user/user.action'
import {getErrorMessage} from 'src/utils/firebase/firebase-error.utils'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import FormInput from '../form-input/form-input.component'
import {ButtonsContainer, Header, SignInContainer} from './sign-in-form.styles'

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const dispatch = useDispatch()
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
    dispatch(googleSignInStart())
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      dispatch(emailSignInStart(email, password))
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
