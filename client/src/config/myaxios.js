import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://h8overflow-server.ahmadfd.site'
})

export default instance
