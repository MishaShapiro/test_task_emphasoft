const TESTuser = {
    username: "test_super",
    password: "Nf<U4f<rDbtDxAPn"
}

export async function userAuth(setMessage, setMsetMessageActive, user) {
    await fetch("https://test-assignment.emphasoft.com/api/v1/login/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        if (res.status >= 200 && res.status < 300) {
            return res.json();
        } else if (res.status < 500) {
            let error = new Error(res.status);
            error.err = "Incorrect login or password";
            throw error
        } else {
            let error = new Error(res.status);
            error.err = "Serverside problems";
            throw error
        }
    })
    .then(data => {
        setMessage(data)
    })
    .catch((e) => {
        if (!e.err) {
            e.err = "Serverside problems"
        }
        setMessage({error: e.err})
        setMsetMessageActive(true)
    })
}