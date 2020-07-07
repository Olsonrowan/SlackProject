import React from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../services/auth'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class SignUpPage extends React.Component {
    state = {
        user: '',
        email: '',
        password: '',
        error: ''
        
    }

    handleSubmit = async event => {
        event.preventDefault()
        try {
            
            let { email, password, user} = this.state
            await signup(email, password, user)
            this.success()
        } catch(err) {
            this.error(err)
        }
    }

    

    success() {
        let { state } = this.props.location
        if (state && state.from) {
            this.props.history.push(state.from.pathname)
        } else {
            this.props.history.push('/')
        }
    }

    error(err) {
        console.log(err)
        alert("This email already in use! Please enter a valid email")
        this.setState({
            error: err.message
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="ui container">
                <form className="classes.root" onSubmit={this.handleSubmit}>
                    <div>
                        <h1>Sign Up</h1>
                        <TextField required id="filled-required"
                            variant="filled"
                            label="Name " 
                            placeholder="Name"
                            type="input"
                            name="user" 
                            onChange={ this.handleChange }
                            value={ this.state.user}
                            />

                        <TextField required id="filled-required"
                            variant="filled"
                            label="Email" 
                            placeholder="Email"
                            type="email"
                            name="email" 
                            onChange={ this.handleChange }
                            value={ this.state.email}
                            />
                            <br></br>
                        <TextField
                            id="filled-password-input"
                            autoComplete="current-password"
                            variant="filled"
                            label="Password"
                            placeholder="Password"
                            type="password"
                            name="password" 
                            onChange={ this.handleChange }
                            value={ this.state.password}
                            />
                    </div>

                    <Button variant='contained'  size='large' color='secondary' type="submit">Sign up</Button>

                    <div>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUpPage