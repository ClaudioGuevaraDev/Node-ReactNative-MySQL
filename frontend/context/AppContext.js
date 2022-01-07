import { createContext } from 'react'

export const initialState = {
    logged: false,
    token: '',
    username: ''
}

const AppContext = createContext()

export default AppContext