import { createStore } from 'vuex'
import { useFetchGet } from '@/helpers/useApi.js'

export default createStore({
  state: {
    cities: {
      list: [],
      loading: false
    },
    flights: {
      list: [],
      loading: false
    },
    searchText: ''
  },
  getters: {
    getFlights (state) {
      if (state.searchText.length >= 3) {
        return [].concat(
          state.flights.list.filter(flight => flight.city.toLowerCase().indexOf(state.searchText.toLowerCase()) > -1),
          state.flights.list.filter(el => el.number.toLowerCase().indexOf(state.searchText.toLowerCase()) > -1)
        )
      }
      return state.flights.list
    }
  },
  mutations: {
    setState: (state, payload) => Object.entries(payload).forEach(([key, value]) => (state[key].list = value)),
    loading: (state, payload) => Object.entries(payload).forEach(([key, value]) => (state[key].loading = value)),
    searchText: (state, payload) => {
      state.searchText = payload
    }
  },
  actions: {
    setCities ({ commit }) {
      commit('loading', { cities: true })
      useFetchGet('cities', { country_code: 'RU' })
        .then((response) => {
          commit('setState', { cities: response })
          commit('loading', { cities: false })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    setArrival ({ state, commit }) {
      commit('loading', { flights: true })
      useFetchGet('schedules', {
        arr_iata: 'SVO',
        _fields: ['flight_iata', 'dep_iata', 'arr_estimated', 'arr_terminal', 'arr_time', 'status']
      })
        .then((response) => {
          const flights = response.filter(el => el.arr_terminal === 'B').map(flight => {
            return {
              number: flight.flight_iata,
              city: state.cities.list.find(city => city.city_code === flight.dep_iata)?.name || flight.dep_iata,
              date: flight.arr_estimated || flight.arr_time,
              status: flight.status
            }
          })
          commit('setState', { flights: flights })
          commit('loading', { flights: false })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    setDeparture ({ state, commit }) {
      commit('loading', { flights: true })
      useFetchGet('schedules', {
        dep_iata: 'SVO',
        _fields: ['flight_iata', 'arr_iata', 'dep_estimated', 'dep_terminal', 'dep_time', 'status']
      })
        .then((response) => {
          const flights = response.filter(el => el.dep_terminal === 'B').map(flight => {
            return {
              number: flight.flight_iata,
              city: state.cities.list.find(city => city.city_code === flight.arr_iata)?.name || flight.arr_iata,
              date: flight.dep_estimated || flight.dep_time,
              status: flight.status
            }
          })
          commit('setState', { flights: flights })
          commit('loading', { flights: false })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  modules: {}
})
