const defaultState = {
    username: null,
    token: null,
    users: []
}

const GET_USERS = "GET_USERS"
const CORRECT_ENTER = "CORRECT_ENTER"
const QUIT = "QUIT"
const DELETE_USER = "DELETE_USER"

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {...state, users: action.payload}
        case DELETE_USER:
            return {...state, users: state.users.filter((item) => item.id != action.payload)}
        case CORRECT_ENTER:
            return {...state, token: action.payload.token, username: action.payload.username}
        case QUIT:
            return defaultState
        default:
            return state
    }
}

export const getUsers = (payload) => {return {type: GET_USERS, payload: payload}}
export const correctEnter = (payload) => {return {type: CORRECT_ENTER, payload: payload}}
export const quit = (payload) => {return {type: QUIT, payload: payload}}
export const deleteUser = (payload) => {return {type: DELETE_USER, payload: payload}}