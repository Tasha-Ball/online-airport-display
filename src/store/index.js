import { createStore } from 'vuex'
import { useFetchGet, useFetchPost, useFetchDelete, useFetchPatch } from '@/helpers/useApi.js'

export default createStore({
  state: {
    flights: {
      list: [],
      loading: false
    },
    search: { text: '' },
    formFlight: {}
  },
  getters: {
    getFlights (state) {
      if (state.search.text.length >= 3) {
        return Object.fromEntries(Object.entries(state.flights.list).filter(([key, value]) => {
          const checkCity = value.city.toLowerCase().indexOf(state.search.text.toLowerCase()) > -1
          const checkNumber = value.number.toLowerCase().indexOf(state.search.text.toLowerCase()) > -1
          return checkCity || checkNumber
        }))
      }
      return state.flights.list
    }
  },
  mutations: {
    setState: (state, payload) => Object.entries(payload).forEach(([key, value]) => (state[key].list = value)),
    setLoading: (state, payload) => Object.entries(payload).forEach(([key, value]) => (state[key].loading = value)),
    setForm: (state, payload) => {
      state.formFlight = payload
    }
  },
  actions: {
    async loadFlights ({ commit }, endpoint) {
      commit('setLoading', { flights: true })
      await useFetchGet(endpoint)
        .then((response) => {
          commit('setState', { flights: response })
          commit('setLoading', { flights: false })
        })
    },
    async addFlight ({ state }) {
      return await useFetchPost(state.formFlight.direction, state.formFlight.list)
        .then((res) => {
          return res
        })
    },
    async updateFlight ({ state }) {
      const endpoint = state.formFlight.direction + '/' + state.formFlight.id
      return await useFetchPatch(endpoint, state.formFlight.list)
        .then((res) => {
          return res
        })
    },
    async deleteFlight ({ commit }, { id, direction }) {
      return await useFetchDelete(direction + '/' + id)
        .then((res) => {
          return res
        })
    },
    updateForm ({ commit }, payload = {}) {
      const form = {
        id: payload.id || '',
        direction: payload.direction || 'departure',
        list: {
          number: payload.number || '',
          city: payload.city || '',
          date: payload.date ? new Date(payload.date) : '',
          status: payload.status || ''
        }
      }
      commit('setForm', form)
    }
  },
  modules: {}
})
