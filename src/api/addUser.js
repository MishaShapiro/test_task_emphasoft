export function userAdd(params, token, func) {

    const url = "https://test-assignment.emphasoft.com/api/v1/users/"
    const tokenString = "Token " + token

    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": tokenString
            },
            body: JSON.stringify(params),
        })
        .then(res => {
            if (res.status === 201) {
                func("Correct")
            } else {
                func("Error", res.status)
            }
        })
        .catch((e) => {
            func("Error", e)
        })
}

