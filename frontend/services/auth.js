import axios from 'axios'

const baseURL = 'http://192.168.1.8:4000/api/auth'

export const signIn = async (user) => {
    const { data } = await axios.post(`${baseURL}/sign-in`, user)
    
    return data
}

export const signUp = async (user) => {
    const { data } = await axios.post(`${baseURL}/sign-up`, user)
    
    return data
}