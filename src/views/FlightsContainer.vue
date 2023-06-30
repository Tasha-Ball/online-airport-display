<template>
  <div :key="$route.query?.user">
    <div v-if="isAuth()" class="admin-text text-uppercase">administrator mode is active</div>
    <Teleport to="body">
      <flight-form :show="showModal" @close="showModal = false" />
    </Teleport>
    <div class="container" :class="{ 'opacity-3': showModal }">
      <div class="header">
        <router-link to="/">
          <img src="@/assets/img/logo.png" alt="SVO" class="header__logo" />
        </router-link>
        <button class="tag admin text-uppercase hover" @click="toAdmin">
          <svg-icon name="admin" :size="15" class="mr-10" />
          <span v-if="!isAuth()">admin login</span>
          <span v-else>admin logout</span>
        </button>
      </div>
      <div class="content">
        <ui-tabs>
          <template v-slot:right v-if="$route.name">
            <ui-search
              placeholder="Search by city or flight number"
              class="tabs-slot"
            />
            <button v-if="isAuth()" class="tag admin text-uppercase hover" @click="openModal({})">
              <svg-icon name="plus" :size="15" class="mr-10" />
              add flight
            </button>
          </template>
        </ui-tabs>
        <div class="content__info">
          <router-view @open-modal="openModal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { isAuth } from '@/helpers/useUser.js'
import SvgIcon from '@/components/ui/svgIcon.vue'
import uiTabs from '@/components/ui/uiTabs.vue'
import uiSearch from '@/components/ui/uiSearch.vue'
import flightForm from '@/components/common/flightForm.vue'

const router = useRouter()
const store = useStore()

const showModal = ref(false)
const openModal = (val = {}) => {
  showModal.value = true
  store.dispatch('updateForm', val)
}

const toAdmin = () => {
  if (!isAuth()) {
    router.push({ query: { user: 'admin' } })
  } else {
    router.push({ query: {} })
  }
}
</script>
