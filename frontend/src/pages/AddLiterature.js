import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { API } from '../../src/config/api';
import Navbar from '../components/Navbar'
import ConfirmAdd from '../components/ConfirmAdd';
import { useHistory } from 'react-router';
import attach from '../assets/attach.png'
import jwt_decode from "jwt-decode"
import './style/addLiterature.css'

function AddLiterature() {
    const history = useHistory()
    const [active, setActive] = useState(false)
    const token = jwt_decode(localStorage.token)
    const [form, setForm] = useState({
        title: "",
        publication_date: "",
        pages: "",
        ISBN: "",
        author: "",
        attachment: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })
    }
    const handleSubmit = useMutation(async (e) => {
        try {
            const body = form
            console.log(body)
            const formData = new FormData();

            formData.set("attachment", form?.attachment[0], form?.attachment[0].name)
            formData.set("title", form.title)
            formData.set("publication_date", form.publication_date)
            formData.set("pages", form.pages)
            formData.set("ISBN", form.ISBN)
            formData.set("author", form.author)

            const config = {
                method: "POST",
                headers: {
                    Authorization: "Basic " + localStorage.token,
                },
                body: formData
              };

              await API().post(`/literatures/${token.id}`, config);
              history.push('/profile')
              UploadAnalytics.mutate()
        } catch (error) {
            console.log(error)
        }
    })
    const {data: analytic} = useQuery("AnalyticsUploadChace", async () => {
        const d = new Date()
        const currentDate = `${d.getFullYear()}-${d.getMonth() + 1}-${twoDigit(d.getDate())}`
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        }
        const response = await API().get(`/analytics/${currentDate}`, config)
        return response.data
    })
    const UploadAnalytics = useMutation(async () => {
        try {
            const body = JSON.stringify({
                literatureUp: form.ISBN
            })
            const config = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + localStorage.token,
                },
                body
            }
            const response = await API().patch(`/analytics/${analytic.id}/${analytic.literatureUp}`, config)
        } catch (error) {
            console.log(error)
        }
    })
    return (
        <div className="addContainer">
            <Navbar/>
            <div className="addContainerTwo">
                {form.attachment ? <ConfirmAdd props={{active, form, changeActive: e => setActive(e), submitLiterature: e => handleSubmit.mutate(e)}}/> : null}
                <h1>Add literature</h1>
                <form className="addFormCont" encType='multipart/form-data' onSubmit={(e) => {
                    e.preventDefault()
                    setActive(true)
                    }}>
                    <input type="text" name="title" onChange={handleChange} placeholder="Title"/>
                    <input type="text" name="publication_date" onChange={handleChange} placeholder="Publication Date"/>
                    <input type="number" name="pages" onChange={handleChange} placeholder="Pages"/>
                    <input type="text" name="ISBN" onChange={handleChange} placeholder="ISBN"/>
                    <input type="text" name="author" onChange={handleChange} placeholder="Author"/>
                    <label className="attachmentLabel" htmlFor="attachment">
                        <p>Attach book file</p>
                        <img src={attach}/>
                        <input type="file" id="attachment" className="attachment" name="attachment" onChange={handleChange}/>
                    </label>
                    <div className="addBtnCont">
                        <button type="submit">Add literature</button>
                        <div></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

const twoDigit = (num) => {
    if(num < 10){
        return `0${num}`
    }else{
        return num
    }
}
export default AddLiterature
