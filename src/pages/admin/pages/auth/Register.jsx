import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import img from "../../../../assets/hr.jpg"
const Register = () => {
    const navigate = useNavigate();
    // forms
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        checkpassword: "",
    })

    // onchange event
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_PROXY_URI}/register-user`, form)
            if (res.data.success) {
                navigate("/login")
                toast.success("User register sucessfully.")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div id="layoutAuthentication" style={{ backgroundImage: `url(${img})`, opacity: '.95', backgroundPosition: "center", backgroundRepeat: 'no-repeat', height: "100vh" }}>
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                {/* <!-- Basic Register form--> */}
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header justify-content-center"><h3 className="font-weight-light my-4">Register</h3></div>
                                    <div className="card-body">
                                        {/* <!-- Register form--> */}
                                        <form>
                                            {/* <!-- Form Group (email address)--> */}
                                            <div className="form-group mb-3">
                                                <label className="small mb-1" htmlFor="inputEmailAddress">Username</label>
                                                <input onChange={(e) => onChange(e)} name='username' className="form-control" id="inputEmailAddress" type="text" placeholder="Enter username" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                                <input onChange={(e) => onChange(e)} name='email' className="form-control" id="inputEmailAddress" type="email" placeholder="Enter email address" />
                                            </div>
                                            {/* <!-- Form Group (password)--> */}
                                            <div className="form-group mb-3">
                                                <label className="small mb-1" htmlFor="inputPassword">Password</label>
                                                <input onChange={(e) => onChange(e)} name='password' className="form-control" id="inputPassword" type="password" placeholder="Enter password" />
                                            </div>
                                            {/* <!-- Form Group (password)--> */}
                                            <div className="form-group mb-3">
                                                <label className="small mb-1" htmlFor="inputPassword">Checkpassword</label>
                                                <input onChange={(e) => onChange(e)} name='checkpassword' className="form-control" id="inputPassword" type="password" placeholder="Enter password" />
                                            </div>
                                            {/* <!-- Form Group (remember password checkbox)--> */}
                                            <div className="form-group mt-2">
                                                <div className="custom-control custom-checkbox">
                                                    <input className="custom-control-input me-2" id="rememberPasswordCheck" type="checkbox" />
                                                    <label className="custom-control-label" htmlFor="rememberPasswordCheck">Remember password</label>
                                                </div>
                                            </div>
                                            {/* <!-- Form Group (Register box)--> */}
                                            <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                {/* <Link className="small" to="/forgotpassword">Forgot Password?</Link> */}
                                                <button className="btn btn-primary" onClick={handleSubmit} type="button">Register</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center">
                                        <div className="small"><Link to="/login">Already have an account? Sign in!</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        </div>
    )
}

export default Register