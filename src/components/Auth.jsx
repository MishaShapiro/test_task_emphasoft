import { useEffect, useState } from "react"
import styles from "./Auth.module.css"
import { userAuth } from "../api/userAuth"
import cross_svg  from "../img/newcross.svg"
import { correctEnter } from "../redux/userReducer"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"

function Auth() {

    const dispatch = useDispatch()
    const navigation = useNavigate()

    const [name, setName] = useState("")
    const [pass, setPass] = useState("")
    const [message, setMessage] = useState({})
    const [messageActiv, setMessageActiv] = useState(false)

    useEffect(() => {
        if (messageActiv) {
            setTimeout(() => {
                setMessageActiv(false)
            }, 2000)
        }
    }, [messageActiv])

    useEffect(() => {
        if (message.token) {
            dispatch(correctEnter({token: message.token, username: name}))
            navigation("/users")
        }
    }, [message])

    return (
        <div className={styles.container}>
            <div className={styles.inputForm}>
                <div className={styles.upperline}></div>
                <h2>Войдите</h2>
                <input className={`${styles.name_input} inp`} type="text" placeholder="Name" value={name} onChange={(e) => {setName(e.target.value)}}/>
                <input className={`${styles.pass_input} inp`} type="password" placeholder="Password" value={pass} onChange={(e) => {setPass(e.target.value)}}/>
                <button className={`${styles.btn} btn`} onClick={() => {
                    userAuth(setMessage, setMessageActiv, {username: name, password: pass})
                }}>Войти</button>
            </div>
            <div className={`${styles.message} ${messageActiv ? styles.active : ""}`}>
                <img src={cross_svg} alt="cross.svg" />
                {message.error}
            </div>
        </div>
    )
}

export default Auth