const axios = require('axios')

const baseUrl = 'https://online-airport-display-default-rtdb.firebaseio.com/'

export async function useFetchGet (endpoint) {
  return await axios
    .get(baseUrl + endpoint + '.json')
    .then(({ data }) => {
      return data
    })
    .catch((error) => {
      console.error(error)
    })
}

export async function useFetchPost (endpoint, params) {
  return await axios
    .post(baseUrl + endpoint + '.json', params)
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error(error)
    })
}

export async function useFetchDelete (endpoint) {
  return await axios
    .delete(baseUrl + endpoint + '.json')
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error(error)
    })
}

export async function useFetchPatch (endpoint, params) {
  return await axios
    .patch(baseUrl + endpoint + '.json', params)
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error(error)
    })
}
