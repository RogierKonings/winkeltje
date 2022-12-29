import * as React from 'react'

import './button.styles.scss'

type ButtonType = 'google' | 'inverted'

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted'
}

const Button = (props: any) => {
  const {children, buttonType, ...otherProps} = props

  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType as ButtonType]}`} {...otherProps}>
      {children}
    </button>
  )
}

export default Button
