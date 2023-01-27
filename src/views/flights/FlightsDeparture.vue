<template>
  <div class="flex-column">
    <div v-if="loading" class="preloader">
      <ui-preloader />
    </div>
    <table v-else class="text-uppercase">
      <tbody v-show="Object.keys(flights).length">
        <tr v-for="(item, index) in flights" :key="index">
          <td width="20%">{{ item.number }}</td>
          <td width="30%">{{ item.city }}</td>
          <td width="30%">{{ formatDateTime(item.date) }}</td>
          <td width="20%">{{ item.status }}</td>
          <td width="10%">
            <div v-if="isAuth()" class="flex">
              <button class="tag admin text-uppercase hover mr-20" @click="editFlight(item, index)">
                <svg-icon name="edit" :size="15" class="mr-10" />
                edit
              </button>
              <button class="tag admin text-uppercase hover" @click="deleteFlight(index)">
                <svg-icon name="delete" :size="15" class="mr-10" />
                delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-show="!Object.keys(flights).length" class="flex-column text-uppercase">
        <tr>No data available</tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { isAuth } from '@/helpers/useUser.js'
import { formatDateTime } from '@/helpers/format.js'
import SvgIcon from '@/components/ui/svgIcon.vue'
import uiPreloader from '@/components/ui/uiPreloader'

const store = useStore()
store.dispatch('loadFlights', 'departure')
const loading = computed(() => store.state.flights.loading)
const flights = computed(() => store.getters.getFlights)

const emit = defineEmits(['openModal'])
const editFlight = (item, id) => {
  const params = {
    ...item,
    direction: 'departure',
    id: id
  }
  emit('openModal', params)
}

const deleteFlight = (id) => {
  const answer = window.confirm('Are you sure you want to delete the flight?')
  if (answer) {
    store.dispatch('deleteFlight', { id, direction: 'departure' }).then(({ status }) => {
      if (status === 200) store.dispatch('loadFlights', 'departure')
    })
  }
}
</script>
