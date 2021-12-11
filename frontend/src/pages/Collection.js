import React from 'react'
import {useQuery} from 'react-query';
import {API} from '../config/api';
import Navbar from '../components/Navbar'
import Card from '../components/Card';
import './style/collection.css'

function Collection() {
    const {data: collection} = useQuery("collectionCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        }
        const response = await API().get('/collections', config)
        return response.data
    })
    return (
        <div className="collectionContainer">
            <Navbar/>
            <div>
                <h1>My Collection</h1>
                <div className="collectionContent">
                    {collection?.map((dataElm) => {
                        return(
                            <div key={dataElm?.id}>
                                <Card props={dataElm?.literature}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Collection
