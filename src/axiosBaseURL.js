import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.thef2e.com/api/',
})

export default instance
