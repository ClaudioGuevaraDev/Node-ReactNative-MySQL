import axios from 'axios'

const baseURL = 'http://192.168.1.4:4000/api/tasks'

export const createTask = async (data, token) => {
    return await axios.post(baseURL, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}