import React from 'react'
import './style/search.css'
import logo from '../assets/logo-big.png'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'

function Search() {
    return (
        <div className="searchContainer">
            <Navbar/>
            <div className="searchTitleContainer">
                <img src={logo}/>
                <SearchBar/>
            </div>
        </div>
    )
}

export default Search
