import './style/detail.css'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import vector from '../assets/Vector.png'
import downLogo from '../assets/cloud-computing.png'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { API } from '../config/api';
import jwt_decode from "jwt-decode"
import { saveAs } from 'file-saver'
import { useHistory } from 'react-router'
import { Document, Page, pdfjs } from 'react-pdf'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

function Detail() {
    const {id} = useParams()
    const history = useHistory()
    const [alreadyIn, setAlreadyIn] = useState(false)
    const base_url = 'http://localhost:5000/uploads/'
    const token = jwt_decode(localStorage.getItem('token'))
    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

    const {data: literature} = useQuery("literatureCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        }
        const response = await API().get(`/literatures/${id}`, config)
        return response.data
    })

    const {data: collection} = useQuery("collectionDetailCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        }
        const response = await API().get(`/collections`, config)
        for(let i = 0; i < response.data.length; i++){
            if (response.data[i].literature.id == id) {
                setAlreadyIn(true)
            }
        }
        return response.data
    })

    const handleAdd = useMutation(async (e) => {
        e.preventDefault()
        try {
            const body = JSON.stringify({userId: `${token?.id}` ,literatureId: `${id}`})
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + localStorage.token
                },
                body
            }
            const response = await API().post('/collections', config)
            if(response.status === "success"){
                console.log("success")
                history.push("/collection")
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
            const response = await API().delete(`/collections/${id}`, config)
            window.location.reload()
            return
        } catch (error) {
            console.log(error)
        }
    })

    const {data: analytic} = useQuery("AnalyticsDownloadChace", async () => {
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

    const downloadAnalytics = useMutation(async () => {
        try {
            const body = JSON.stringify({
                literatureDw: id
            })
            const config = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + localStorage.token,
                },
                body
            }
            const response = await API().patch(`/analyticsDw/${analytic.id}/${analytic.literatureDw}`, config)
        } catch (error) {
            console.log(error)
        }
    })
    const saveFile = () => {
        saveAs(
            `${base_url}${literature?.attachment}`,
            `${literature?.title}.pdf`
        )
        downloadAnalytics.mutate()
    }
    return (
        <div>
            <Navbar/>
            <div className="detailRow">
                <div className="detailColOne">
                    <Document
                        file={base_url+`${literature?.attachment}`}>
                        <Page pageNumber={1}/>
                    </Document>
                </div>
                <div className="detailColTwo">
                    <div>
                        <h1>{literature?.title}</h1>
                        <p>{literature?.author}</p>
                    </div>
                    <div>
                        <h3>Publication Date</h3>
                        <p>{literature?.publication_date}</p>
                    </div>
                    <div>
                        <h3>Pages</h3>
                        <p>{literature?.pages}</p>
                    </div>
                    <div>
                        <h3>ISBN</h3>
                        <p>{literature?.ISBN}</p>
                    </div>
                    <div>
                        <button onClick={saveFile}>
                                Download <img src={downLogo} alt="logo"/>
                        </button>
                    </div>
                </div>
                <div className="detailColThree">
                    <div>
                        {alreadyIn === false ? (
                            <button onClick={(e) => handleAdd.mutate(e)}>
                                Add My Collection <img src={vector} alt="logo"/>
                            </button>
                        ) : (
                            <button onClick={() => handleDelete.mutate()}>
                                Remove Collection <img src={vector} alt="logo"/>
                            </button>
                        )}
                    </div>
                </div>
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
export default Detail
