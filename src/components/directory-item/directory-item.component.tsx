import * as React from 'react'

import {Category} from '../../types/category.types'
import {BackgroundImage, Body, DirectoryItemContainer} from './directory-item.styles'

type Props = {
  category: Category
}

const DirectoryItem = ({category}: Props) => {
  const {imageUrl, title} = category
  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem
