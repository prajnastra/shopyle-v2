import { Products } from '../api/types'

interface ProductCartData extends Products {
  count: number
}

const STORAGE_KEY = 'SHOPYLE-CART'

export const addItemToCart = (item: Products) => {
  let cart: Array<ProductCartData> = []
  if (typeof window !== undefined) {
    console.log('Triggerd')
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      cart = JSON.parse(data)
    }
    cart.push({
      ...item,
      count: 1,
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }
  return
}

export const loadCart = (): Array<ProductCartData> => {
  if (typeof localStorage === 'undefined' || localStorage === null) return []
  if (typeof window !== undefined) {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      return JSON.parse(data)
    }
  }
  return []
}

export const removeItemFromCart = (productId: string) => {
  let cart: Array<ProductCartData> = []
  if (typeof window !== undefined) {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      cart = JSON.parse(data)
    }
    cart.map((product: ProductCartData, index: number) => {
      if (product._id === productId) {
        cart.splice(index, 1)
      }
      return product
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }
  return cart
}

export const cartEmpty = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem(STORAGE_KEY)
    let cart: Array<ProductCartData> = []
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }
}
