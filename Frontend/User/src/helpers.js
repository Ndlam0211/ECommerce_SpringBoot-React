import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

// Lưu user và jwt vào localStorage
export const storeUser = (data) => {
    localStorage.setItem(
        "user",
        JSON.stringify({
            userData: data.user,
            jwt: data.jwt
        })
    )
}

// Lấy dữ liệu của user được lưu trong localStorage
export const getUserData = () => {
    const stringifiedUser = localStorage.getItem("user") || '""'
    return JSON.parse(stringifiedUser || {})
}

// Xóa user trong localStorage
export const removeUser = () => {
    localStorage.removeItem("user")
}

// Lưu cart vào localStorage
export const storeCart = (data) => {
    localStorage.setItem(
        "cartItems",
        JSON.stringify(data)
    )
}

// Lấy dữ liệu của cart được lưu trong localStorage
export const getCartData = () => {
    const stringifiedCart = localStorage.getItem("cartItems") || '""'
    return JSON.parse(stringifiedCart || {});
}

// Xóa cart khỏi localStorage
export const removeCart = () => {
    localStorage.removeItem("cartItems")
}

// Lưu admin và jwt vào localStorage
export const storeAdmin = (data) => {
    localStorage.setItem(
        "admin",
        JSON.stringify({
            adminData: data.user,
            jwt: data.token
        })
    )
}

// Lấy dữ liệu của admin được lưu trong localStorage
export const getAdminData = () => {
    const stringifiedUser = localStorage.getItem("admin") || '""'
    return JSON.parse(stringifiedUser || {})
}

// Xóa admin trong localStorage
export const removeAdmin = () => {
    localStorage.removeItem("admin")
}

// Navigate về trang login khi chưa đăng nhập (Trang admin)
export const Protector = ({Component}) => {
    const navigate = useNavigate()

    const { jwt } = getAdminData()

    useEffect(() => {
        if(!jwt){
            navigate("/admin/login")
        }
    },[navigate,jwt])
    return <Component/>
}