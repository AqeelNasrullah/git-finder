import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { AiFillEye, AiFillStar } from 'react-icons/ai'
import { BiCodeAlt, BiGitRepoForked } from 'react-icons/bi'
import { BsFillExclamationCircleFill } from 'react-icons/bs'
import { FaHeart, FaLock } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PUBLIC_URL } from '../conf/conf'
import { getContributors, getLanguages, getSingleRepo } from '../store/actions/reposActions'
import { getCommits } from "../store/actions/reposActions";
import { Button, Input, InputGroup, InputGroupAddon, ListGroup, ListGroupItem } from 'reactstrap'
import LazyLoad from 'react-lazyload'
import CopyToClipboard from 'react-copy-to-clipboard'
import { HiOutlineClipboardCopy } from "react-icons/hi";

const Repo = (props) => {
    const userParam = props.match.params.userParam;
    const repoParam = props.match.params.repoParam;

    const [commitsToDisplay, setCommitsToDisplay] = useState(10)
    const [copied, setCopied] = useState(false);

    const dispatch = useDispatch();
    const repo = useSelector(state => state.repo);
    const commits = useSelector(state => state.commits);
    const contributors = useSelector(state => state.contributors);
    const languages = useSelector(state => state.languages);

    let ttl = 0;
    let lang_render = '';

    useEffect(() => {
        dispatch(getSingleRepo(userParam, repoParam));
        dispatch(getCommits(userParam, repoParam));
        dispatch(getContributors(userParam, repoParam));
        dispatch(getLanguages(userParam, repoParam));
    }, [dispatch, userParam, repoParam])

    for (const i in languages.result) {
        ttl += languages.result[i];
    }

    for (const key in languages.result) {
        if (Number((languages.result[key] / ttl) * 100).toFixed(1) !== '0.0')
        lang_render += `| ${ key } ${ Number((languages.result[key] / ttl) * 100).toFixed(1) }% |`;
    }

    return (
        <div>
            <div className="container py-3 d-flex justify-content-between align-items-center mb-3">
                <div style={{ width: '50px' }}>
                    <Link to="/"><img src={PUBLIC_URL + 'icon.ico'} alt="Logo not found" width="100%" /></Link>
                </div>
                <Link to="login" className="btn btn-outline-primary"><FaLock /> Login</Link>
            </div>

            {
                repo.loading ? (
                    <div className="py-5">
                        <h1 className="text-center"><i className="spinner-grow"></i></h1>
                    </div>
                ) : repo.err ? (
                    <div className="py-5">
                        <h4 className="text-center"><BsFillExclamationCircleFill /> {repo.err}</h4>
                    </div>
                ) : (
                    <>
                        <div className="container jumbotron">
                            <div className="d-flex align-items-center justify-content-between">
                                <h2 className="font-weight-bolder">{repo.result.full_name}</h2>
                                <h5><span><AiFillEye /> Watchers: {repo.result.watchers_count}</span> <span><AiFillStar /> Stars : {repo.result.stargazers_count}</span> <span><BiGitRepoForked /> Forks: {repo.result.forks_count}</span></h5>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <h5 className="mb-0">By <Link to={`/user/${repo?.result?.owner?.login}`}>@{repo.result.owner.login}</Link></h5>
                                <h6 className="mb-0">Created {moment(repo.result.created_at).fromNow()}</h6>
                            </div>
                        </div>

                        <div className="container py-5 px-md-0">
                            <div className="row">
                                <div className="col-md-8">
                                    <h1>Commits</h1>
                                    {
                                        commits.loading ? (
                                            <div className="py-3">
                                                <h1 className="text-center"><i className="spinner-grow"></i></h1>
                                            </div>
                                        ) : commits.err ? (
                                            <div className="py-3">
                                                <h4 className="text-center"><BsFillExclamationCircleFill /> {repo.err}</h4>
                                            </div>
                                        ) : (
                                            <>
                                                <ListGroup className="mb-5">
                                                    {commits.result.slice(0, commitsToDisplay).map(commit => (
                                                        <ListGroupItem key={commit.sha}>
                                                            <LazyLoad>
                                                                <div className="d-flex align-items-center justify-content-between">
                                                                    <h5>{commit.commit.message}</h5>
                                                                    <p>#{commit.sha}</p>
                                                                </div>
                                                                <div>
                                                                    {
                                                                        commit.committer ? (
                                                                            <div className="d-flex align-items-center">
                                                                                <div style={{ width: '35px', height: '35px', overflow: 'hidden', borderRadius: '100%' }} className="mr-3"><img src={commit.committer.avatar_url} alt="Avatar not found" width="100%" /></div>
                                                                                <h5 className="mb-0">{commit.committer.login} <small>Committed {moment(commit.commit.committer.date).fromNow()}</small></h5>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="d-flex align-items-center">
                                                                                <div style={{ width: '35px', height: '35px', overflow: 'hidden', borderRadius: '100%' }} className="mr-3"><img src={PUBLIC_URL + 'icon.ico'} alt="Avatar not found" width="100%" /></div>
                                                                                <h5 className="mb-0">{commit.commit.committer.name} <small>Committed {moment(commit.commit.committer.date).fromNow()}</small></h5>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            </LazyLoad>
                                                        </ListGroupItem>
                                                    ))}
                                                </ListGroup>

                                                {
                                                    commits.result.length > commitsToDisplay ? (
                                                        <div className="text-center"><Button type="button" style={{ width: '130px', height: '50px', borderRadius: '0px', padding: '0px' }} outline onClick={() => setCommitsToDisplay(commitsToDisplay + 10)}>SHOW MORE</Button></div>
                                                    ) : (
                                                        <h5 className="text-center">No more commits to display.</h5>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </div>
                                <div className="col-md">
                                    <div>
                                        <h5 className="font-weight-bolder">Clone Repository</h5>

                                        <InputGroup>
                                            <Input type="text" value={repo.result.clone_url} onChange={() => 0} disabled />
                                            <InputGroupAddon addonType="append">
                                                <CopyToClipboard text={repo.result.clone_url} onCopy={() => setCopied(true)}><Button type="button" title="Copy to Clipboard"><HiOutlineClipboardCopy /></Button></CopyToClipboard>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        {copied && <p className="text-center text-success">Copied !</p>}
                                    </div>
                                    <hr />
                                    <div>
                                        <h3 className="font-weight-bolder">About</h3>
                                        <p>{repo.result.description || 'No description'}</p>
                                    </div>
                                    {
                                        contributors.loading ? (
                                            <>
                                                <hr />
                                                <div>
                                                    <h3 className="font-weight-bolder">Contributors</h3>
                                                    <h1 className="text-center py-3"><i className="spinner-grow"></i></h1>
                                                </div>
                                            </>
                                        ) : contributors.err ? (
                                            <>
                                                <hr />
                                                <div>
                                                    <h3 className="font-weight-bolder">Contributors</h3>
                                                    <h1 className="text-center py-3">{ contributors.err }</h1>
                                                </div>
                                            </>
                                        ) : contributors.result && (
                                            <>
                                                <hr />
                                                <div>
                                                    <h3 className="font-weight-bolder">Contributors</h3>
                                                    { contributors.result.slice(0,3).map(contributor => {
                                                        return (
                                                            <LazyLoad key={ contributor.id }>
                                                                <div className="d-flex align-items-center mb-2">
                                                                    <div style={{ width: '50px', height: '50px', overflow: 'hidden', borderRadius: '100%', marginRight: '15px' }}>
                                                                        <img src={ contributor.avatar_url } alt="Avatar not found" width="100%" />
                                                                    </div>
                                                                    <div>
                                                                        <h6 className="font-weight-bolder mb-0">{ contributor.login }</h6>
                                                                        <small>{ contributor.contributions } Contributions</small>
                                                                    </div>
                                                                </div>
                                                            </LazyLoad>
                                                        )
                                                    }) }
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        languages.loading ? (
                                            <>
                                                <hr />
                                                <div>
                                                    <h3 className="font-weight-bolder">Languages</h3>
                                                    <h1 className="text-center py-3"><i className="spinner-grow"></i></h1>
                                                </div>
                                            </>
                                        ) : languages.err ? (
                                            <>
                                                <hr />
                                                <div>
                                                    <h3 className="font-weight-bolder">Languages</h3>
                                                    <h1 className="text-center py-3">{ languages.err }</h1>
                                                </div>
                                            </>
                                        ) : languages.result && (
                                            <>
                                                <hr />
                                                <div>
                                                    <h3 className="font-weight-bolder">Languages</h3>
                                                    { lang_render }
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-md-right px-3 mt-3">Developed with <FaHeart className="text-danger" /> by AQEEL NASRULLAH</p>
                    </>
                )
            }
        </div>
    )
}

export default Repo
