import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { useHistory } from  'react-router'

function Navbar() {
    const history = useHistory()
    let currentUrl = window.location.href
    let currentTab = currentUrl.replace(localStorage.url, "")
    const tabStyle = currentTab === "add" ? "addStyle":
                     currentTab === "profile" ? "profileStyle":
                     currentTab === "collection" ? "collectionStyle": "noStyle"

    return (
        <div className="navbarContainer"> 
            <div className="navbarMenu">
                <button><p className={`profile-${tabStyle}`} onClick={() => history.push('/profile')}>Profile</p></button>
                <button><p className={`collection-${tabStyle}`} onClick={() => history.push('/collection')}>My Collection</p></button>
                <button><p className={`add-${tabStyle}`} onClick={() => history.push('/add')}>Add literature</p></button>
                <button><p onClick={() => {
                    localStorage.removeItem('token')
                    history.push('/')
                }}>Logout</p></button>
            </div>
            <div className="navbarLogo" onClick={() => history.push('/search')}>
                <img src={logo} alt="logo"/>
            </div>
        </div>
    )
}

export default Navbar
