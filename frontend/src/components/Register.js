import React, { useState} from 'react'
import { Modal } from 'react-bootstrap'
import { useMutation } from 'react-query';
import { API } from '../config/api.js';

function Register(props) {
    const [errorMsg, setErrorMsg] = useState("")
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        photo: "avatar.png",
        gender: "",
    })
    const {fullName, email, password, phone, address} = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = useMutation(async (e) => {
        e.preventDefault()
        try {
            const body = JSON.stringify(form)
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body
            }
            const response = await API().post('/register', config)
            if(response.status === "success"){
                console.log("success")
                setForm({
                    fullName: "",
                    email: "",
                    password: "",
                    phone: "",
                    address: "",
                    photo: "avatar.png",
                    gender: ""
                })
                props.props.changeRegist(false)
            }else{
                setErrorMsg(response.error)
            }
        } catch (error) {
            console.log(error)
        }
    })
    return (
        <Modal show={props.props.regist}>
            <div className="modalContainer">
                <div className="titleModalContainer">
                    <h1 className="modalTitle">Sign Up</h1>
                    <button onClick={e => props.props.changeRegist(false)}>X</button>
                </div>
                {errorMsg ? <p style={{color: "#AF2E1C"}}>input is invalid</p> : null}
                <form className="modalCont" onSubmit={(e) => handleSubmit.mutate(e)}>
                    <input type="text" value={email} name="email" onChange={handleChange} placeholder="Email"/>
                    <input type="password" value={password} name="password" onChange={handleChange} placeholder="Password"/>
                    <input type="text" value={fullName} name="fullName" onChange={handleChange} placeholder="Full Name"/>
                    <select name="gender" onChange={handleChange}>
                        <option disabled>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <input type="number" value={phone} name="phone" onChange={handleChange} placeholder="Phone"/>
                    <input type="text" value={address} name="address" onChange={handleChange} placeholder="Address"/>
                    <button type="submit">Submit</button>
                    <small className="alreadyHaveAccount">Already have an account? Click 
                        <button onClick={e => {
                            props.props.changeRegist(false)
                            props.props.changeLogin(true)
                        }}>Here</button>
                    </small>
                </form>
            </div>
        </Modal>
    )
}

export default Register
