import axios from 'axios'
import { useUsersStore } from "../Store/UsersStore";

const api = axios.create({
  baseURL: 'https://exp-hk1g.onrender.com',
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('first')
    const st = useUsersStore()
    st.loadMarker = true

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('after res')
    const st = useUsersStore()
    st.loadMarker = false

    return response
  },
  (error) => {
    const st = useUsersStore()
    st.loadMarker = false

    return Promise.reject(error)
  }
)

export default api