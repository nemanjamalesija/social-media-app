import { baseUrl } from '../constants/baseUrl'
import useGetToken from '../composables/useGetToken'
import { useToast } from 'vue-toastification'
import type { UserType } from '@/types/userType'

export default async function acceptFriend(userId: string) {
  const jwtToken = useGetToken()
  const toast = useToast()

  try {
    const response = await fetch(`${baseUrl}/users/accept`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        id: userId
      })
    })

    if (!response.ok) {
      const error = await response.json()
      toast.error(error.message)

      return
    } else {
      const {
        data: { targetUser }
      } = await response.json()
      toast.success('User added to your friends list')
      return targetUser as UserType
    }
  } catch (error) {
    toast.error('Oop, something went wrong!')
    console.log(error)
  }
}
