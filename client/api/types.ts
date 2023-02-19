export interface SignupPayload {
  name: string
  email: string
  password: string
}

export interface AddCategoryPayload {
  name: string
}

export interface Categories {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
}
