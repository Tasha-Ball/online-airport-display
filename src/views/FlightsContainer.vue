<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/img/logo.png" alt="SVO" class="header__logo" />
      <button class="tag header__admin text-uppercase">
        <svg-icon name="admin" size="15" />
        <span>admin</span>
      </button>
    </div>
    <div class="content">
      <ui-tabs>
        <template v-slot:right v-if="$route.name">
          <ui-search
            v-model="searchText"
            placeholder="Search by city or flight number"
            class="tabs-slot"
          />
        </template>
      </ui-tabs>
      <div v-if="loading" class="preloader">
        <ui-preloader />
      </div>
      <div v-else class="content__info">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import SvgIcon from '@/components/ui/svgIcon.vue'
import uiTabs from '@/components/ui/uiTabs.vue'
import uiPreloader from '@/components/ui/uiPreloader.vue'
import uiSearch from '@/components/ui/uiSearch.vue'

const store = useStore()
store.dispatch('setCities')
const loading = computed(() => store.state.cities.loading)
const searchText = ref('')
</script>
