import * as React from 'react'
import {useNavigate} from 'react-router-dom'

import {Category} from '../../types/category.types'
import {BackgroundImage, Body, DirectoryItemContainer} from './directory-item.styles'

type Props = {
  category: Category
}

const DirectoryItem = ({category}: Props) => {
  const {imageUrl, title, route} = category
  const navigate = useNavigate()

  const onNavigateHandler = () => navigate(route)

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem
