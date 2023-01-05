import {UserCredential} from 'firebase/auth'
import * as React from 'react'
import {useState} from 'react'
import {getErrorMessage} from 'src/utils/firebase/firebase-error.utils'
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from 'src/utils/firebase/firebase.utils'
import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'

import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {displayName, email, password, confirmPassword} = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('passwords do not match')
      return
    }

    try {
      const {user} = (await createAuthUserWithEmailAndPassword(email, password)) as UserCredential
      await createUserDocumentFromAuth(user, {displayName})
      resetFormFields()
    } catch (error) {
      alert(getErrorMessage(error.code))
    }
  }

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const {name, value} = event.target as any

    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">SIGN UP</Button>
      </form>
    </div>
  )
}

export default SignUpForm
