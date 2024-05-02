import { useDispatch, useSelector } from "react-redux"
import styles from "./Users.module.css"
import { usersGet } from "../api/usersGet"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Loading from "../img/Loading.svg"
import UserCart from "./UserCart"

function Users() {

    const dispatch = useDispatch()
    const navigation = useNavigate()
    const user = useSelector(state => state.user)

    const [filteredUser, setFilteredUser] = useState([])
    const [searchedUser, setSearchedUser] = useState("")

    useEffect(() => {
        if (user.token) {
            dispatch(usersGet(user.token))
        } else {
            navigation("/")
        }
    }, [])

    useEffect(() => {
        setFilteredUser(user.users)
    }, [user])

    useEffect(() => {
        setFilteredUser(user.users.filter((user) => {
            return (searchedUser === "" || user.username.slice(0, searchedUser.length) === searchedUser)
        }))
    }, [searchedUser])

    console.log(user.users, filteredUser)

    return (
        <div className={styles.container}>
            {user.users.length > 0 ?
                <div className={styles.main}>
                    <div className={styles.search}>
                        <input className={styles.inp} type="findUser" placeholder="Search user" value={searchedUser} onChange={(e) => {setSearchedUser(e.target.value)}}/>
                    </div>
                    <div className={styles.carts}>
                        {filteredUser.length > 0 ?
                            (filteredUser.map((element) => {
                                return <UserCart user={element}/>
                            }))
                            :
                            <p className={styles.notUsers}>По данному фильтру не найдено пользователей!</p>
                        }
                    </div>
                    <button className={`${styles.btn_add} btn`} onClick={() => {navigation("/user/add")}}>Добавить пользователя</button>
                </div>
                :
                <img width={200} height={200} src={Loading} alt="Loading.svg" />
            }
        </div>
    )
}

export default Users