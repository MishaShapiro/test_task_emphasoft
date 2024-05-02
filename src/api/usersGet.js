import { getUsers } from "../redux/userReducer"

export function usersGet(token) {

    const tokenString = "Token " + token

    return (dispatch) => {
        fetch('https://test-assignment.emphasoft.com/api/v1/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": tokenString
            }})
        .then(response => response.json())
        .then(json => {
            setTimeout(() => {
                dispatch(getUsers(json))
            }, 1000)
        })
    }
}

