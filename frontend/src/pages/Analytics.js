import React, { useState } from 'react'
import logo from '../assets/logo.png'
import profile from '../assets/profile.png'
import Charts from '../components/Charts'
import { useHistory } from 'react-router'
import Dropdown from '../components/Dropdown'
import './style/analytics.css'

function Analytics() {
    const history = useHistory()
    const [isDropdown, setIsDropdown] = useState(false)
    return (
        <div className="analyticsContainer">
            <div className="analyticsNavbarContainer">
                <div className="analyticsNavbarLogo" onClick={() => history.push('/admin-dashboard')}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className="avatar">
                    <img src={profile} alt="profile" onClick={() => setIsDropdown(!isDropdown)}/>
                    {isDropdown ? <Dropdown/> : null}
                </div>
            </div>
            <div className="analyticsCharts">
                <Charts/>
            </div>
        </div>
    )
}

export default Analytics
