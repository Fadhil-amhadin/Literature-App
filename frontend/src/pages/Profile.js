import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import mail from '../assets/mail.png'
import phone from '../assets/phone.png'
import gender from '../assets/gender.png'
import alertLogo from '../assets/alert.png'
import address from '../assets/address.png'
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';
import './style/profile.css'
import Card from '../components/Card'
import jwt_decode from "jwt-decode"
import ProfileAlert from '../components/ProfileAlert'
import DeleteLiteratureUser from '../components/DeleteLiteratureUser'

function Profile() {
    let literatureStyling
    const [alert, setAlert] = useState(false)
    const [active, setActive] = useState(false)
    const [currentId, setCurrentId] = useState(0)
    const token = jwt_decode(localStorage.getItem('token'))
    const {data: literatures} = useQuery("myLiteraturesCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        }
        const response = await API().get('/literatures', config)
        return response.data
    })
    const {data: user} = useQuery("profilUserCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        }
        const response = await API().get(`/users/${token.id}`, config)
        return response.data
    })
    const {data: cancelLiterature} = useQuery("cancelLiteratureCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        }
        const response = await API().get(`/cancel`, config)
        return response.data
    })
    // ==================== handle form ==================== //
    const [preview, setPreview] = useState(null)

    const [form, setForm] = useState({
        photo: "",
    })
    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        })
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }
    const handleSubmit = useMutation(async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.set("photo", form.photo[0], form.photo[0].name)
    
          const config = {
            method: "PATCH",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
            body: formData,
          };
          const response = await API().patch(`/users`, config);
          window.location.reload()
        } catch (error) {
          console.log(error);
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
        <div className="profileContainer">
            <Navbar/>
            <ProfileAlert props={{alert, changeAlert: e => setAlert(e)}}/>
            <DeleteLiteratureUser props={{active, changeActive: e => setActive(e), handleDelete: e => handleDelete.mutate(e)}}/>
            <div className="profileContainerTwo">
                <div>
                    <h1>Profile{cancelLiterature ? <img onClick={() => setAlert(true)} src={alertLogo} alt="alert"/> : null}</h1>
                </div>
                <div className="profileContainerThree">
                    <div className="profileSectLeft">
                        <div>
                            <div className="logo">
                                <img src={mail} alt="mail"/>
                            </div>
                            <div className="text">
                                <h6>fadhilamhadin@gmail.com</h6>
                                <p>email</p>
                            </div>
                        </div>
                        <div>
                            <div className="logo">
                                <img src={gender} alt="gender"/>
                            </div>
                            <div className="text">
                                <h6>Male</h6>
                                <p>gender</p>
                            </div>
                        </div>
                        <div>
                            <div className="logo">
                                <img src={phone} alt="phone"/>
                            </div>
                            <div className="text">
                                <h6>082343543221</h6>
                                <p>phone</p>
                            </div>
                        </div>
                        <div>
                            <div className="logo">
                                <img src={address} alt="address"/>
                            </div>
                            <div className="text">
                                <h6>Jl Perintis</h6>
                                <p>address</p>
                            </div>
                        </div>
                    </div>
                    <div className="profileSectRight">
                        <form onSubmit={e => handleSubmit.mutate(e)}>
                            <label htmlFor="profilePhoto">
                                {preview ? <img src={preview} alt="img"/>: user === undefined ? null: <img src={`http://localhost:5000/uploads/${user?.photo}`} alt="img"/>}
                            </label>
                            <input type="file" id="profilePhoto" name="photo" onChange={handleChange}></input>
                            <div>
                                <button type="submit">Change Photo Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="profileContainerFour">
                <h1>My Literature</h1>
                <div className="profileCardCont">
                    {literatures?.filter(literatures => literatures?.user?.id == token.id)
                    .map((dataElm) => {
                        return(
                            <div className="profileCardCont" key={dataElm.id}>
                                <div style={{display: "none"}}>{literatureStyling = `card-${dataElm?.status}`}</div>
                                <div className={literatureStyling}>
                                    {dataElm?.status === "cancel" ? (
                                        <p onClick={() => {
                                            setCurrentId(dataElm?.id)
                                            setActive(true)
                                        }}>{dataElm?.status}</p>
                                    ) : <p>{dataElm?.status}</p>}
                                </div>
                                <Card props={dataElm}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Profile
