export function usersDelete(id, token, func) {

    const url = "https://test-assignment.emphasoft.com/api/v1/users/" + id
    const tokenString = "Token " + token

    fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": tokenString
            }})
        .then(res => {
            if (res.status === 204) {
                func("Correct")
            } else {
                func("Error")
            }
        })
        .catch((e) => {
            func("Error")
        })
}

