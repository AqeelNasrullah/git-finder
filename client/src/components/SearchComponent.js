import React, { useEffect, useState } from 'react'
import { FaHeart, FaLock } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PUBLIC_URL } from '../conf/conf'
import { getSearchResult } from '../store/actions/searchActions'
import { BsExclamationCircleFill } from "react-icons/bs";
import { BiLink } from "react-icons/bi";
import { AiFillGithub } from "react-icons/ai";
import LazyLoad from 'react-lazyload'
import { Button } from 'reactstrap'

const GitHubUser = (props) => {
    const user = props.user;

    return (
        <div className="d-flex justify-content-between align-items-center pb-3 mb-3" style={{ borderBottom: '2px solid lightgray', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>
            <div className="d-flex align-items-center">
                <div style={{ width: '100px', height: '100px', overflow: 'hidden' }} className="mr-3">
                    <img src={user.avatar_url} alt="Avatar not found" width="100%" />
                </div>
                <div>
                    <h3 className="mb-0"><Link to={`/user/${ user.login }`} className="text-dark">@ {user.login}</Link></h3>
                    <h5><a href={user.html_url} target="_blank" rel="noreferrer"><BiLink /> {user.html_url}</a></h5>
                </div>
            </div>
            <div className="pull-right">
                <a href={user.html_url} target="_blank" rel="noreferrer" title="View on Github" className="text-dark" style={{ fontSize: '40px' }}><AiFillGithub /></a>
            </div>
        </div>
    )
}

const Search = (props) => {
    const searchParam = props.match.params.search;
    const dispatch = useDispatch();
    const search = useSelector(state => state.search);
    const [itemsToDisplay, setItemsToDisplay] = useState(10);

    useEffect(() => {
        dispatch(getSearchResult(searchParam));
    }, [dispatch, searchParam])

    return (
        <div>
            <div className="container py-3 d-flex justify-content-between align-items-center">
                <div style={{ width: '50px' }}>
                    <Link to="/"><img src={PUBLIC_URL + 'icon.ico'} alt="Logo not found" width="100%" /></Link>
                </div>
                <Link to="login" className="btn btn-outline-primary"><FaLock /> Login</Link>
            </div>

            {
                search.loading ? (
                    <div className="container">
                        <h1 className="text-center"><i className="spinner-grow"></i></h1>
                    </div>
                ) : search.err ? (
                    <div className="py-4" style={{ backgroundColor: 'lightgray' }}>
                        <div className="container">
                            <h3 className="mb-3">Search result for <strong>{searchParam}</strong></h3>
                            <h5 className="m-0 text-danger"><BsExclamationCircleFill /> {search.err}</h5>
                        </div>
                    </div>
                ) : search.search.total_count === 0 ? (
                    <div className="py-4" style={{ backgroundColor: 'lightgray' }}>
                        <div className="container">
                            <h3 className="mb-3">Search result for <strong>{searchParam}</strong></h3>
                            <h5 className="m-0 text-danger"><BsExclamationCircleFill /> No search result found</h5>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="py-4" style={{ backgroundColor: 'lightgray' }}>
                            <div className="container">
                                <h3 className="m-0">Search result for <strong>{searchParam}</strong></h3>
                                <h5 className="m-0">Total {search.search.items.length.toLocaleString()} search result(s)</h5>
                            </div>
                        </div>

                        <div className="container py-5">
                            {search.search.items.slice(0, itemsToDisplay).map((item, index) => <LazyLoad key={item.id}>
                                {<GitHubUser user={item} index={index} />}
                            </LazyLoad>)}
                        </div>
                    </>
                )
            }

            { search.search?.items.length > itemsToDisplay ? (
                <div className="text-center mb-5"><Button type="button" style={{ width: '175px', height: '75px', borderRadius: '0px', padding: '0px' }} outline onClick={ () => setItemsToDisplay(itemsToDisplay + 5) }>SHOW MORE</Button></div>
            ): (
                <div>
                    <p className="text-center">No more users.</p>
                </div>
            ) }

            <p className="text-center text-md-right px-3 mt-3">Developed with <FaHeart className="text-danger" /> by AQEEL NASRULLAH</p>
        </div>
    )
}

export default Search
