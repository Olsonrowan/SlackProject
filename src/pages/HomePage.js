import React from 'react'

import { Link } from 'react-router-dom'

import { signout } from '../services/auth'


const HomePage = props => {
    return (
        <div>
            { props.authenticated ?(
                null
            ) : <div className="ui container">
                    <h1>Welcome! Please login or sign up with us</h1>
                </div>}

            { props.authenticated ? (
                <div>
                <h1>Home</h1>
                <button onClick={signout}>Sign Out</button>
                </div>
            ) : (
                <div className="ui container">
                <div className ="ui buttons">
                    <button className="ui button">
                    <Link to="/login">Login</Link>

                    </button>

                    <div className="or"></div>

                    <button className="ui button">
                    <Link to="/signup">Sign up</Link>
                    </button>
                </div>
                </div>

            )} 
        </div>
    )
}

export default HomePage