import * as React from 'react'
import {Category} from '../../types/category.types'
import DirectoryItem from '../directory-item/directory-item.component'

import './directory.styles.scss'

type Props = {
  categories: Category[]
}

const Directory = ({categories}: Props) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default Directory
