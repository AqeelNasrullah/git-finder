import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from "../store/actions/userActions";
import { BsExclamationCircleFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FaLock, FaBuilding, FaEnvelope, FaBriefcase, FaUsers, FaHeart, FaCode, FaStar } from 'react-icons/fa';
import { PUBLIC_URL } from '../conf/conf';
import { BiGitRepoForked, BiLink } from 'react-icons/bi';
import { RiGitRepositoryFill } from "react-icons/ri";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { getRepos } from '../store/actions/reposActions';
import { Button } from 'reactstrap';

const User = (props) => {
    const userParam = props.match.params.userParam;
    const [reposToDisplay, setReposToDisplay] = useState(6);

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const repos = useSelector(state => state.repos);

    useEffect(() => {
        dispatch(getUsers(userParam));
        dispatch(getRepos(userParam));
    }, [dispatch, userParam])

    if (user.loading) {
        return (
            <div className="container py-5">
                <h1 className="text-center"><i className="spinner-grow"></i></h1>
            </div>
        )
    } else if (user.err) {
        return (
            <div className="container py-5">
                <h4 className="text-center text-danger"><BsExclamationCircleFill /> {user.err}</h4>
            </div>
        )
    } else {
        return (
            <div>
                <div className="container py-3 d-flex justify-content-between align-items-center mb-3">
                    <div style={{ width: '50px' }}>
                        <Link to="/"><img src={PUBLIC_URL + 'icon.ico'} alt="Logo not found" width="100%" /></Link>
                    </div>
                    <Link to="login" className="btn btn-outline-primary"><FaLock /> Login</Link>
                </div>

                <div className="jumbotron container">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <div style={{ width: '150px', height: '150px', overflow: 'hidden', margin: '0px auto', marginBottom: '15px', borderRadius: '100%' }}>
                                <img src={user.result.avatar_url} alt="Avatar not found" width="100%" />
                            </div>
                            <h4 className="text-center mb-0">{user.result.name}</h4>
                            <h6 className="text-center"><a href={user.result.html_url} target="_blank" rel="noreferrer">@{user.result.login}</a></h6>
                            <p className="text-center mb-0">{user.result.bio}</p>
                        </div>
                        <div className="col-md-8">
                            <div className="row justify-content-center">
                                <div className="col-sm-6">
                                    <h5 title="Company"><FaBuilding /> {user.result.company || 'N/A'}</h5>
                                    <h5 title="Blog"><a href={user.result.blog} target="_blank" rel="noreferrer"><BiLink /> {user.result.blog || 'N/A'}</a></h5>
                                    <h5 title="Email"><FaEnvelope /> {user.result.email || 'N/A'}</h5>
                                    {user.result.hireable && <h5 className="text-success"><FaBriefcase /> Open to work</h5>}
                                    <h5><FaUsers /> <Link to={`/user/${user.result.login}/followers`}>{user.result.followers} Followers</Link> - <Link to={`/user/${user.result.login}/following`}>{user.result.following} Following</Link></h5>
                                    <h5><RiGitRepositoryFill /> {user.result.public_repos} Repositories</h5>
                                    <h5><a href={user.result.html_url} target="_blank" rel="noreferrer"><AiFillGithub /> Github</a> - <a href={`https://twitter.com/${user.result.twitter_username}`} target="_blank" rel="noreferrer"><AiOutlineTwitter /> Twitter</a></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container p-md-0">
                    <h3>Repositories</h3>
                    {repos.loading ? (
                        <div>
                            <h3 className="text-center"><i className="spinner-grow"></i></h3>
                        </div>
                    ) : repos.err ? (
                        <div>
                            <h4 className="text-center text-danger"><BsExclamationCircleFill /> {repos.err}</h4>
                        </div>
                    ) : (
                        <>
                            <div className="row">
                                {repos?.result?.slice(0, reposToDisplay).map(repo => (
                                    <div className="col-md-6 mb-3" key={repo.id}>
                                        <div style={{ backgroundColor: 'lightgray', borderRadius: '5px' }} className="p-3">
                                            <h5 className="font-weight-bolder"><Link to={`/user/${ userParam }/repo/${ repo.name }`}>{repo.name}</Link></h5>
                                            <div className="d-flex justify-content-between">
                                                <p className="mb-0"><FaCode /> { repo.language || 'N/A' }</p>
                                                <p className="mb-0"><FaStar /> { repo.stargazers_count }</p>
                                                <p className="mb-0"><BiGitRepoForked /> { repo.forks_count }</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            { repos.result.length > reposToDisplay ? (
                                <div className="text-center mb-5"><Button type="button" style={{ width: '130px', height: '50px', borderRadius: '0px', padding: '0px' }} outline onClick={ () => setReposToDisplay(reposToDisplay + 6) }>SHOW MORE</Button></div>
                            ) : (
                                <p className="text-center mb-5">No more repositories to show.</p>
                            ) }
                        </>
                    )}
                </div>

                <p className="text-center text-md-right px-3 mt-3">Developed with <FaHeart className="text-danger" /> by AQEEL NASRULLAH</p>
            </div>
        )
    }
}

export default User
