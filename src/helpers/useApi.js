const axios = require('axios')

const token = 'ef505307-8a29-4b16-ae3e-f265620e1160'
const baseUrl = 'https://airlabs.co/api/v9/'

export async function useFetchGet (endpoint, options) {
  const params = {
    ...options,
    api_key: token
  }
  return await axios
    .get(baseUrl + endpoint, {
      params: params
    })
    .then(({ data }) => {
      return data.response
    })
    .catch((error) => {
      console.error(error)
    })
}
