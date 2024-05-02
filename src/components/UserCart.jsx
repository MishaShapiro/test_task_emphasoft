import { useDispatch, useSelector } from "react-redux"
import { usersDelete } from "../api/userDelete"
import styles from "./UserCart.module.css"
import { deleteUser } from "../redux/userReducer"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"


function UserCart({user}) {

    const token = useSelector(state => state.user).token
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [messange, setMessange] = useState("")

    useEffect(() => {
        if (messange == "Error") {
            alert("Ошибка удаления")
        } else if (messange == "Correct") {
            dispatch(deleteUser(user.id))
        }
        setMessange("")
    }, [messange])
 
    return (
        <div className={styles.cart}>
            <p className={styles.id}>id: {user.id}</p>
            <p className={styles.id}>username: {user.username}</p>
            <div className={styles.mainInfo}>
                <p>{user.first_name}</p>
                <p>{user.last_name}</p>
            </div>
            <div className={styles.btns}>
                <button className={`${styles.edit_btn} btn`} onClick={() => {
                    navigate("/user/" + user.id)
                }}>Edit</button>
                <button className={`${styles.delete_btn} btn`} onClick={() => {
                    usersDelete(user.id, token, setMessange)
                }}>Delete</button>
            </div>
        </div>
    )
}

export default UserCart