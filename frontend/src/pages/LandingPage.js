import React, { useState } from 'react'
import './style/landingPage.css'
import logo from '../assets/logo.png'
import landingImg from '../assets/landing-img.png'
import Register from '../components/Register'
import Login from '../components/Login'

function LandingPage() {
    const [regist, setRegist] = useState(false)
    const [login, setLogin] = useState(false)
    localStorage.setItem('url', window.location.href)

    return (
        <div className="landingContainer">
            <Register props={{regist: regist, changeRegist: e => setRegist(e), changeLogin: e => setLogin(e)}}/>
            <Login props={{login: login, changeLogin: e => setLogin(e), changeRegist: e => setRegist(e)}}/>
            <div className="landingLeft">
                <div className="frontLogo">
                    <img src={logo} alt="logo"/>

                </div>
                <div className="landingContent">
                    <h1>source <i>of</i> intelligence</h1>
                    <p>Sign-up and receive unlimited accesss to all of your literatur - share your literature.</p>
                    <div className="frontBtnContainer">
                        <button className="frontSignUp" onClick={() => setRegist(true)}>Sign Up</button>
                        <button className="frontSignIn" onClick={() => setLogin(true)}>Sign In</button>
                    </div>
                </div>
            </div>
            <div className="landingRight">
                <div>
                    <img src={landingImg} alt="landing-img"/>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
