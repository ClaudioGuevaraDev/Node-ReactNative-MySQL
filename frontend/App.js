import { useReducer } from 'react'

import AppContext, { initialState } from './context/AppContext'
import AppReducer from './context/AppReducer'

import Router from './Router'

const App = () => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <Router/>
        </AppContext.Provider>
    )
}

export default App