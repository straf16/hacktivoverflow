import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://hacktiv-overflow.herokuapp.com/'
})

export default instance
