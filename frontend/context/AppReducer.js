import {
    LOGGED_USER
} from './AppConstants'

const AppReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case LOGGED_USER:
            return {
                ...state,
                logged: payload.logged,
                token: payload.token,
                userId: payload.userId,
                username: payload.username
            }
        default:
            return state
    }
}

export default AppReducer