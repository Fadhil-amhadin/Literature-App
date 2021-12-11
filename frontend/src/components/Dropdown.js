import React from 'react'
import logout from '../assets/logout.png'
import charts from '../assets/charts.png'
import { useHistory } from  'react-router'

function Dropdown() {
    const history = useHistory()
    return (
        <div className="dropdownContainer">
            <div  className="arrow-container">
                <div className="top-arrow"></div>
            </div> 
            <div className="dropdownContent">
            <span onClick={() => {
                    history.push('/analytics')
                    }}>
                    <div>
                        <img src={charts} alt="charts"></img>
                    </div>
                    <p>Analytics</p>
                </span>
                <span onClick={() => {
                    localStorage.removeItem("token")
                    history.push('/')
                    }}>
                    <div>
                        <img src={logout} alt="logout"></img>
                    </div>
                    <p>Logout</p>
                </span>
            </div>
        </div>
    )
}

export default Dropdown
