export type UserType = {
  _id: string
  firstName: string
  lastName: string
  email?: string
  photo: string
  friendRequests?: UserType[]
  friends?: UserType[]
  role?: string
  active?: boolean
}
