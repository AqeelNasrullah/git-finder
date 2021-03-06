import React from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import Home from './HomeComponent'
import Login from './LoginComponent'
import Repo from './RepoComponent'
import Search from './SearchComponent'
import User from './UserComponent'

const Main = () => {
    return (
        <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/search/:search" component={ Search } />
            <Route exact path="/user/:userParam" component={ User } />
            <Route path="/user/:userParam/repo/:repoParam" component={ Repo } />
            <Route path="/login" component={ Login } />

            {/* 404 */}
            <Route component={ () => {
                return (
                    <div className="container py-5">
                        <h3>404 | Not Found</h3>
                        <h5>The resource you are requesting is not available on server.</h5>
                        <hr />
                        <p className="text-center mb-0"><Link to="/">Back to Home</Link></p>
                    </div>
                )
            } } />
        </Switch>
    )
}

export default Main