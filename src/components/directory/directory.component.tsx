import * as React from 'react'
import {Category} from '../../types/category.types'
import DirectoryItem from '../directory-item/directory-item.component'
import {DirectoryContainer} from './directory.styles'

type Props = {
  categories: Category[]
}

const Directory = ({categories}: Props) => {
  return (
    <DirectoryContainer>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </DirectoryContainer>
  )
}

export default Directory
