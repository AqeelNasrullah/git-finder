import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaLock } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { Button, Form, Input } from 'reactstrap';
import { PUBLIC_URL } from '../conf/conf';

const Home = () => {
    const [submitting, setSubmitting] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const handleInput = e => {
        const val = e.target.value;
        setSearchInput(val);
    }

    const handleSearchForm = e => {
        e.preventDefault();
        if (searchInput) {
            alert(searchInput);
        }
    }

    return (
        <>
            {submitting &&
                (<div style={{ width: '100%', height: '100vh', backgroundColor: 'rgba(225, 225, 255, 0.75)', position: 'fixed' }}>
                    <p style={{ fontSize: '30px' }} className="text-center pt-5"><i className="spinner-border"></i> Requesting...</p>
                </div>)}
            <div className="container-fluid">
                <div className="container py-3 d-flex justify-content-between align-items-center">
                    <div style={{ width: '50px' }}>
                        <Link to="/"><img src={PUBLIC_URL + 'icon.ico'} alt="Logo not found" width="100%" /></Link>
                    </div>
                    <Link to="login" className="btn btn-outline-primary"><FaLock /> Login</Link>
                </div>
                <div className="container py-5">
                    <div>
                        <h1 className="text-center font-weight-bolder"><BsSearch /> FindGit - Find Github Profiles</h1>
                        <p className="text-center">Check out the repos, followers and more, just by entering a username!</p>
                        <Form noValidate onSubmit={handleSearchForm}>
                            <div className="d-flex align-items-center search-form" style={{ maxWidth: '700px', padding: '125px 0px', margin: '0px auto' }}>
                                <Input type="text" id="search" name="search" placeholder="Enter username" bsSize="lg" value={searchInput} onChange={handleInput} />
                                <Button type="submit" outline color="info"><BsSearch /></Button>
                            </div>
                        </Form>
                    </div>
                </div>
                <p className="text-center text-md-right">Developed with <FaHeart className="text-danger" /> by AQEEL NASRULLAH</p>
            </div>
        </>
    )
}

export default Home
