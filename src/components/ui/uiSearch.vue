<template>
    <div class="tag search gap-5 hover">
      <svg-icon name="search" />
      <input v-model="search.text" :placeholder="placeholder || 'Поиск'" />
    </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import SvgIcon from '@/components/ui/svgIcon.vue'

defineProps({
  placeholder: String
})
const store = useStore()
const search = computed(() => store.state.search)
</script>

<style lang="scss">
@import "@/assets/sass/search.scss";
</style>
