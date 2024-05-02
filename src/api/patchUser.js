export function userEdit(params, token, id, func) {

    const url = "https://test-assignment.emphasoft.com/api/v1/users/" + id
    const tokenString = "Token " + token

    fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": tokenString
            },
            body: JSON.stringify(params),
        })
        .then(res => {
            if (res.status === 200) {
                func("Correct")
            } else {
                func("Error", res.status)
            }
        })
        .catch((e) => {
            func("Error", e)
        })
}

