import React from 'react'
import { FaHeart, FaLock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { PUBLIC_URL } from '../conf/conf'

const Search = (props) => {
    return (
        <div>
            <div className="container py-3 d-flex justify-content-between align-items-center">
                <div style={{ width: '50px' }}>
                    <Link to="/"><img src={ PUBLIC_URL + 'icon.ico' } alt="Logo not found" width="100%" /></Link>
                </div>
                <Link to="login" className="btn btn-outline-primary"><FaLock /> Login</Link>
            </div>
            
            <div className="py-4" style={{ backgroundColor: 'lightgray' }}>
                <div className="container">
                    <h3 className="m-0">Search result for <strong>{ props.match.params.search }</strong></h3>
                    <h5 className="m-0">Total { 20 } search result(s)</h5>
                </div>
            </div>

            <p className="text-center text-md-right px-3 mt-3">Developed with <FaHeart className="text-danger" /> by AQEEL NASRULLAH</p>
        </div>
    )
}

export default Search
