import { useEffect, useState } from "react"
import styles from "./Add.module.css"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { userAdd } from "../api/addUser"

function Add() {

    const navigation = useNavigate()
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (!user.token) {
            navigation("/")
        }
    }, [])

    const [isValid, setValide] = useState(true)
    const [valideMess, setValideMess] = useState("")
    const [username, setUsername] = useState("")
    const [first_name, setFirstName] = useState("") 
    const [last_name, setLastName] = useState("") 
    const [password, setPassword] = useState("") 
    const [active, setActive] = useState(false) 

    const [findErr, setFindErr] = useState("")

    useEffect(() => {
        const arr = user.users.filter(user => user.username === username)
        if (username == "") {
            setValide(false)
            setValideMess("Username field may not be blank.")
        } else if (arr.length > 0) {
            setValide(false)
            setValideMess("A user with that username already exists.")
        } else if (password.length < 8) {
            setValide(false)
            setValideMess("Password should be 8+ characters")
        } else if (password.toLowerCase() === password) {
            setValide(false)
            setValideMess("Password should be 1 capital")
        } else if (!/[0-9]/.test(password)) {
            setValide(false)
            setValideMess("Password should be 1 numeric")
        } else {
            setValide(true)
            setValideMess("")
        }
    }, [username, password])

    useEffect(() => {
        if (findErr == "Correct") {
            navigation("/users/")
        } else if (findErr) {
            alert(findErr)
        }
        setFindErr("")
    }, [findErr])

    return (
        <div className={styles.container}>
            <div className={styles.inputs}>
                <input type="text" value={username} placeholder={"username"} className={styles.inp} onChange={(e) => {setUsername(e.target.value)}}/>
                <input type="text" value={first_name} placeholder={"first_name"} className={styles.inp} onChange={(e) => {setFirstName(e.target.value)}}/>
                <input type="text" value={last_name} placeholder={"last_name"} className={styles.inp} onChange={(e) => {setLastName(e.target.value)}}/>
                <input type="password" value={password} placeholder={"password"} className={styles.inp} onChange={(e) => {setPassword(e.target.value)}}/>
                <label className={styles.lable}>
                    <input type="checkbox" value={active} className={styles.check} checked={active} onChange={() => {setActive(!active)}}/> Active
                </label>
                <p className={styles.message}>{valideMess}</p>
                <div className={styles.btns}>
                    <button className={"btn"} onClick={() => {navigation("/users")}}>Отмена</button>
                    <button className={"btn"} disabled={!isValid} onClick={() => {
                        userAdd({
                            "username": username,
                            "first_name": first_name,
                            "last_name": last_name,
                            "is_active": active,
                            "password": password}, user.token, setFindErr)
                    }}>Добавить</button>
                </div>
            </div>
        </div>
    )
}

export default Add