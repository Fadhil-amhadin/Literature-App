import React, { useState} from 'react'
import { Modal } from 'react-bootstrap'
import { useMutation, useQuery } from 'react-query';
import { API } from '../config/api.js';
import { useHistory } from 'react-router';
import jwt_decode from "jwt-decode"

function Login(props) {
    const history = useHistory();
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const {email, password} = form
    const [errorMsg, setErrorMsg] = useState("")

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleVisitor = useMutation(async (e) => {
        try {
            let alreadyIn = false
            const d = new Date()
            const token = jwt_decode(localStorage.getItem('token'))
            const currentDate = `${d.getFullYear()}-${d.getMonth() + 1}-${twoDigit(d.getDate())}`
            const body = JSON.stringify({
                literatureDw: "[]",
                literatureUp: "[]",
                date: currentDate
            })
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + localStorage.token
                },
                body
            }
            const isAnalytics = analytics ? analytics : []
            for(let i = 0; i < isAnalytics.length; i++){
                if(isAnalytics[i].userId === token.id && isAnalytics[i].date === currentDate) alreadyIn = true
            }
            if(!alreadyIn) {
                const response = await API().post('/analytics', config)
            }
        } catch (error) {
            console.log(error)
        }
    })
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
            const response = await API().post('/login', config)

            if(response.status === "success"){
                localStorage.setItem('token', response.data.token)

                const token = jwt_decode(localStorage.getItem('token'))

                if(token.status === "user"){
                    history.push('/search')
                    handleVisitor.mutate(e)
                }else if(token.status === "admin"){
                    history.push('./admin-dashboard')
                }
            }else{
                setErrorMsg(response.error)
            }
        } catch (error) {
            console.log(error)
        }
    })
    const {data: analytics} = useQuery("AnalyticsLoginChace", async () => {
        const config = {
            method: "GET"
        }
        const response = await API().get('/analyticsLog', config)
        return response.data
    })

    return (
        <Modal show={props.props.login}>
            <div className="modalContainer">
                <div className="titleModalContainer">
                    <h1 className="modalTitle">Sign In</h1>
                    <button onClick={e => props.props.changeLogin(false)}>X</button>
                </div>
                {errorMsg ? <p style={{color: "#AF2E1C"}}>input is invalid</p> : null}
                <form className="modalCont" onSubmit={(e) => handleSubmit.mutate(e)}>
                    <input type="text" value={email} name="email" onChange={handleChange} placeholder="Email"/>
                    <input type="password" value={password} name="password" onChange={handleChange} placeholder="Password"/>
                    <button type="submit">Submit</button>
                    <small className="dontHaveAccount">Don't have an account? Click 
                        <button onClick={e => {
                            props.props.changeLogin(false)
                            props.props.changeRegist(true)
                        }}>Here</button>
                    </small>
                </form>
            </div>
        </Modal>
    )
}

const twoDigit = (num) => {
    if(num < 10){
        return `0${num}`
    }else{
        return num
    }
}
export default Login
