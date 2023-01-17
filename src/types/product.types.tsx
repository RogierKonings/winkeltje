export interface Categories {
  title: string
  items: Product[]
}

export interface Product {
  id: number
  name: string
  imageUrl: string
  price: number
}

export interface CartProduct extends Product {
  quantity: number
}
