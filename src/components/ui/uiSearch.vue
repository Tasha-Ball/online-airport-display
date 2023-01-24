<template>
    <div class="tag search gap-5">
      <svg-icon name="search" />
      <input :placeholder="placeholder || 'Поиск'" v-model="value" />
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import SvgIcon from '@/components/ui/svgIcon.vue'

export default {
  name: 'uiSearch',
  components: { SvgIcon },

  emits: ['update:modelValue'],

  props: {
    modelValue: String,
    placeholder: String
  },

  setup (props, { emit }) {
    const store = useStore()

    return {
      value: computed({
        get: () => props.modelValue,
        set: (value) => {
          emit('update:modelValue', value)
          store.commit('searchText', value)
        }
      })
    }
  }
}
</script>
