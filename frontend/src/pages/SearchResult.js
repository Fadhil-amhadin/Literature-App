import React, { useState } from 'react'
import './style/searchResult.css'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import no_result from '../assets/no_result.png'
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import { API } from '../config/api';

function SearchResult() {
    let cont
    const {props} = useParams()
    const history = useHistory()
    const [time, setTime] = useState("")

    const handleChange = (e) => {
        setTime(e.target.value)
    }
    const {data: literatures} = useQuery("literaturesCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        }
        const response = await API().get('/literatures', config)
        return response.data
    })
    return (
        <div className="searchResult">
            <Navbar/>
            <div className="searchContRes">
                <SearchBar/>
            </div>
            <div className="resultContainer">
                <div className="resultLeft">
                    <h4>Anytime</h4>
                    <form>
                        <select name="literature-time" onChange={handleChange}>
                            <option value="">All</option>
                            <option value="2020">Since 2020</option>
                            <option value="2021"> Since 2021</option>
                        </select>
                    </form>
                </div>
                <div className="resultRight">
                    {cont = literatures?.filter(e => !literatures ? false : e.status === "approved")
                    .filter(e => !props ? true : e.title.toLowerCase().includes(props.toLowerCase()))
                    .filter(e => !time ? true : e.publication_date.includes(time))
                    .map((dataElm) => {
                        return (
                            <div key={dataElm.id} onClick={() => history.push(`/detail/${dataElm.id}`)}>
                                <Card props={dataElm}/>
                            </div>
                        )
                    })}
                    {cont? cont.length < 1 ? (
                        <div>
                            <img src={no_result} alt="no_result"/>
                        </div>
                    ) : null : null}
                </div>
            </div>
        </div>
    )
}

export default SearchResult
