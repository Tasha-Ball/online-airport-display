<template>
  <div class="flex-column">
    <div v-if="loading" class="preloader">
      <ui-preloader />
    </div>
    <table v-else class="table">
      <tbody v-show="flights.length > 0">
        <tr v-for="(item, index) in flights" :key="index">
          <td>{{ item.number }}</td>
          <td>{{ item.city }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
      <tbody v-show="!flights.length" class="flex-column text-uppercase">
        <tr>No data available</tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
store.dispatch('setDeparture')
const loading = computed(() => store.state.flights.loading)
const flights = computed(() => store.getters.getFlights)
</script>
