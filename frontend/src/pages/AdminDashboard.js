import React, { useState } from 'react'
import './style/adminDashboard.css'
import tick from '../assets/tick.png'
import cross from '../assets/cross.png'
import {useQuery, useMutation} from 'react-query';
import {API} from '../config/api';
import logo from '../assets/logo.png'
import profile from '../assets/profile.png'
import Dropdown from '../components/Dropdown';
import DeleteLiterature from '../components/DeleteLiterature';

function AdminDashboard() {
    let no = 0
    const [active, setActive] = useState(false)
    const [isDropdown, setIsDropdown] = useState(false)
    const [currentId, setCurrentId] = useState(0)
    const {data: literatures} = useQuery("AdminCache", async () => { // use refetch
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        }
        const response = await API().get('/literatures', config)
        return response.data
    })
    const handleCancel = useMutation(async (e) => {
        console.log(e)
        try {
            const body = JSON.stringify({status : "cancel"})
            const config = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + localStorage.token
                },
                body
            }
            const response = await API().patch(`/literatures/${e}`, config)
            if(response.status === "success"){
                console.log("success")
                window.location.reload()
            }else{
                console.log("failed")
            }
        } catch (error) {
            console.log(error)
        }  
    })
    const handleApprove = useMutation(async (e) => {
        try {
            const body = JSON.stringify({status : "approved"})
            const config = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + localStorage.token
                },
                body
            }
            const response = await API().patch(`/literatures/${e}`, config)
            if(response.status === "success"){
                console.log("success")
                window.location.reload()
            }else{
                console.log("failed")
            }
        } catch (error) {
            console.log(error)
        }  
    })
    const handleDelete = useMutation(async () => {
        try {
            const config = {
                method: "DELETE",
                headers: {
                    Authorization: "Basic " + localStorage.token,
                },
            }
            const response = await API().delete(`/literatures/${currentId}`, config)
            window.location.reload()
            return
        } catch (error) {
            console.log(error)
        }
    })
    return (
        <div className="adminContainer">
            <div className="adminNavbarContainer">
                <div className="adminNavbarLogo">
                    <img src={logo} alt="logo"/>
                </div>
                <div className="avatar" onClick={() => setIsDropdown(!isDropdown)}>
                    <div>
                        <img src={profile} alt="profile"/>
                    </div>
                    {isDropdown ? <Dropdown/> : null}
                </div>
            </div>
            <DeleteLiterature props={{active, changeActive: e => setActive(e), handleDelete: e => handleDelete.mutate(e)}}/>
            <div className="adminTitle">
                <h1>Book verification</h1>
                <div className="list-content">
                    <table className="list-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>User or Author</th>
                                <th>ISBN</th>
                                <th>Literature</th>
                                <th>Status</th>
                                <th className="actionTable">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {literatures?.map(e => {
                                no++;
                                const rowStyling = `no-${no % 2 === 0}`
                                const statusStyling = `${e?.status}-${rowStyling}`;

                                return(
                                    <tr key={e?.id}>
                                        <td className={rowStyling}>{no}</td>
                                        <td className={rowStyling}>{e?.author}</td>
                                        <td className={rowStyling}>{e?.ISBN}</td>
                                        <td className={rowStyling}>
                                            <a href={`http://localhost:5000/uploads/${e?.attachment}`} target="_blank" style={{textDecoration: "none"}}>{e?.title}.pdf</a>
                                        </td>
                                        <td className={statusStyling}>{e?.status}</td>
                                        <td className={rowStyling}>
                                            <span>
                                                {e?.status === "waiting" ? (
                                                    <>
                                                    <button className="btnCancel" onClick={() => handleCancel.mutate(e?.id)}>Cancel</button>
                                                    <button className="btnApprove" onClick={() => handleApprove.mutate(e?.id)}>Approve</button></>
                                                ) : e?.status === "cancel" ? 
                                                    <span className="adminDeleteCont">
                                                        <div>
                                                            <img onClick={() => {
                                                                setCurrentId(e?.id)
                                                                setActive(true)
                                                            }} className="crossSymbol" src={cross}/>
                                                        </div>
                                                    </span>
                                                : <img src={tick}/>}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default AdminDashboard
