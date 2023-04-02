import jwtDecode from "jwt-decode"
import { Outlet, Navigate } from "react-router-dom"

export const PrivetRoute = () => {
    const useData = localStorage?.getItem('token') && jwtDecode(localStorage?.getItem('token'))
    return (useData?.isAdmin ? <Outlet /> : <Navigate to='/login' />)
}