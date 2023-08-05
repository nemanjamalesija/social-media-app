import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserType, visitedUserAditionalInfoType } from '../types/userType'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref({} as UserType)

  const loading = ref(false)

  function setLoading(value: boolean) {
    loading.value = value
  }

  function setCurrentUser(userAPI: UserType) {
    currentUser.value = userAPI
  }

  const visitedUser = ref({} as UserType)
  const visitedUserAditionalInfo = ref({} as visitedUserAditionalInfoType)

  // friend requests related
  function acceptFriendRequest(currentUser: UserType, targetUser: UserType) {
    currentUser.friendRequests = currentUser.friendRequests?.filter((f) => f._id !== targetUser._id)
    targetUser.friendRequests = targetUser.friendRequests?.filter((f) => f._id === currentUser._id)

    currentUser.friends?.push(targetUser)
    targetUser.friends?.push(currentUser)
  }

  function removeFriend(currentUser: UserType, targetUser: UserType) {
    currentUser.friends = currentUser.friends?.filter((f) => f._id !== targetUser._id)
    targetUser.friends = targetUser.friends?.filter((f) => f._id !== currentUser._id)
  }

  function dennyFriendRequest(targetUserId: string) {
    const newUserFriendRequests = currentUser.value.friendRequests?.filter(
      (f) => f._id !== targetUserId
    )
    currentUser.value.friendRequests = newUserFriendRequests
  }

  return {
    loading,
    setLoading,
    currentUser,
    setCurrentUser,
    visitedUser,
    visitedUserAditionalInfo,
    acceptFriendRequest,
    dennyFriendRequest,
    removeFriend
  }
})
