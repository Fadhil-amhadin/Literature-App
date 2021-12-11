import React, { useState } from 'react'
import { useHistory } from 'react-router';
import searchLogo from '../assets/search.png'

function SearchBar() {
    const history = useHistory()

    const [query, setQuery] = useState("")
    const handleChange = (e) => {
        setQuery(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/search-result/${query}`)
    }
    return (
        <div className="searchBarContainer">
            <form className="searchBarContainer" onSubmit={handleSubmit}>
                <input type="text" className="searchInput" onChange={handleChange} placeholder="search for literature"/>
                <button type="submit" className="searchSubmit">
                    <img src={searchLogo} alt="search"/>
                </button>
            </form>
        </div>
    )
}

export default SearchBar
