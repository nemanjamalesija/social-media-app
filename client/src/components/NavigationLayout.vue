<script setup lang="ts">
import useGetUserStore from '../composables/useGetUserStore'
import { ref } from 'vue'
import SearchUserInput from './ui/SearchUserInput.vue'
import logOut from '@/api/logOut'
import { useRouter } from 'vue-router'
const { currentUser, setCurrentUser } = useGetUserStore()
const router = useRouter()
const isUserInfoDropDown = ref<boolean>(false)

async function logOutHandler() {
  await logOut()

  setCurrentUser({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    photo: '',
    role: '',
    friends: [],
    friendRequests: [],
    active: true
  })
  router.push('/login')
}
</script>

<template>
  <header
    v-if="currentUser.firstName"
    class="header-nav shadow fixed top-0 w-full z-40 max-w-screen-2xl bg-white transition-all duration-300"
  >
    <nav
      class="nav relative h-full px-5 flex items-center justify-between text-base lg:text-lg font-medium"
    >
      <!-- Logo and page navigation -->
      <div class="flex items-center py-2">
        <div class="logo flex items-center gap-2">
          <RouterLink to="/">
            <p
              class="capitalize font-semibold mr-1 h-10 w-10 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center relative transition-all duration-200"
            >
              <span class="absolute text-3xl font-semibold text-white">S</span>
            </p>
          </RouterLink>

          <!-- Search input -->
          <SearchUserInput />
        </div>
      </div>

      <!-- User info -->
      <div
        v-if="currentUser.firstName"
        class="user absolute right-[5%] flex flex-col items-center gap-3 font-bold"
        @click="isUserInfoDropDown = !isUserInfoDropDown"
      >
        <div class="user__photo-box flex gap-3 items-center">
          <img
            v-if="currentUser.photo"
            class="card__picture-img object-cover h-10 w-10 inline-block rounded-full cursor-pointer"
            :src="currentUser.photo"
            :alt="currentUser.firstName + ' image'"
          />
          <button
            class="bg-slate-300 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
            v-if="!currentUser.photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" class="w-8 h-8">
              <path
                fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <p class="username inline-block font-semibold cursor-pointer">
            {{ currentUser.firstName }}
          </p>

          <!-- Drop down modal -->
          <div
            :class="
              isUserInfoDropDown ? 'account account-active' : 'account invisible hidden opacity-0'
            "
          >
            <RouterLink class="nav__link inline-block" :to="`/${currentUser._id}`">
              <div class="flex items-center gap-2">
                <p class="bg-slate-300 rounded-full h-9 w-9 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </p>
                <p>My profile</p>
              </div>
            </RouterLink>

            <button
              v-if="currentUser.firstName"
              class="nav__link text-start"
              @click.prevent="logOutHandler"
            >
              <div class="flex items-center gap-2">
                <p class="bg-slate-300 rounded-full h-9 w-9 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </p>
                <p>Log out</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav__link {
  padding: 0.4rem 4rem 0.4rem 0.4rem;
  border-radius: 6px;
}

.nav__link:hover {
  transition: all 0.2s;
  background-color: #e2e8f0;
}

.account {
  position: absolute;
  top: 110%;
  right: 0.3%;
  max-height: 0;
  width: max-content;
  transition: all 0.1s ease-in-out;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  gap: 0.5rem;
  border-radius: 0.375rem;
  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.1);
}

.account-active {
  padding: 0.8rem;
  max-height: 300px;
  opacity: 1;
}
</style>
