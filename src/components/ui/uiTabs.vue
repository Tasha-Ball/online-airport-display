<template>
  <div class="tabs flex-1 gap-20 mb-20" >
    <div
      class="tab text-uppercase"
      :class="{ active: item.name === route.name }"
      @click="toRoute(item)"
      v-for="item in values"
      :key="item.name"
    >
      {{ item.meta?.title || item.name }}
    </div>
    <div class="flex-1" />
    <div id="tab_controls" />
    <slot name="right" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const values = computed(
  () => route.matched[route.matched.length - 2].children || []
)
const toRoute = ({ path }) =>
  router.push({ path, query: { user: route.query.user } })
</script>

<style lang="scss">
@import "@/assets/sass/tabs.scss";
</style>
