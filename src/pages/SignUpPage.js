import React from 'react'
import { Link } from 'react-router-dom'

//material ui design imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../services/firebase'
import Alert from '@material-ui/lab/Alert';

// hash md5 for avatars on profile user.photoURL
import md5 from 'md5'



class SignUpPage extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
        loading: false,
        usersRef: firebase.database().ref('user')
    };

    isFormValid = () =>{
        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)) {
            error = {message: 'Fill in all fields'}
            this.setState({ errors: errors.concat(error) });
            return false;
        } else if(!this.isPasswordValid(this.state)){
            error = {message: 'Password is invalid'}
            this.setState({ errors: errors.concat(error) });
            return false;
        } else {

            return true;
        }
    }

    isFormEmpty = ({ username, email, password, passwordConfirmation }) =>{
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
        }


        isPasswordValid = ({ password, passwordConfirmation }) =>{
            if (password.length < 6 || passwordConfirmation.length < 6){
                return false;
            }else if( password !== passwordConfirmation) {
                return false;
            } else{
                return true;
            }
        }

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid()){
        this.setState({ errors: [], loading: true});
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
            console.log(createdUser);
            createdUser.user.updateProfile({
                displayName: this.state.username,
                photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon` 

            })
            .then(() =>{
                this.saveUser(createdUser).then(() => {
                    console.log('user saved');
                })
            })
            .catch(err =>{
                console.log(err);
                this.setState({errors: this.state.errors.concat(err), loading: false})
            })
        })
         .catch(err => {
            this.setState({ 
                errors: this.state.errors.concat(err),
                loading: false
            });
         });
        }
    }

    

    // success() {
    //     let { state } = this.props.location
    //     if (state && state.from) {
    //         this.props.history.push(state.from.pathname)
    //     } else {
    //         this.props.history.push('/')
    //     }
    // }


displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

    // error(err) {
    //     console.log(err)
    //     alert("This email already in use! Please enter a valid email")
    //     this.setState({
    //         error: err.message
    //     })
    // }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })

    }
    
    handleInputError = (errors, inputName ) => {
        return errors.some(error => 
            error.message.toLowerCase().includes(inputName)
            )
             ? 'error'
             : ''
    }

    render() {
        const { 
            username,
            email,
            password,
            passwordConfirmation, 
            errors,
            loading,
        } = this.state;

        return (
            <div className="container">
                <form className="classes.root" onSubmit={this.handleSubmit}>
                    <div>
                        <h1>Sign Up</h1>
                        <TextField  
                            variant="filled"
                            label="Name " 
                            placeholder="Name"
                            type="input"
                            name="username" 
                            
                            onChange={ this.handleChange }
                            value={username}
                            />
                            <br></br>

                        <TextField  
                            variant="filled"
                            label="Email" 
                            placeholder="Email"
                            type="email"
                            name="email" 
                            className={this.handleInputError(errors, 'email')}
                            onChange={ this.handleChange }
                            value={email}
                            />
                            <br></br>
                        <TextField
                           
                            autoComplete="current-password"
                            variant="filled"
                            label="Password"
                            placeholder="Password"
                            type="password"
                            name="password" 
                            onChange={ this.handleChange }
                            className={this.handleInputError(errors, 'password')}

                            value={password}
                            />
                            <br></br>
                            <TextField
                            
                            autoComplete="current-password"
                            variant="filled"
                            label="Re-enter Password"
                            placeholder="Password"
                            type="password"
                            name="passwordConfirmation" 
                            className={this.handleInputError(errors, 'password')}
                            onChange={ this.handleChange }
                            value={passwordConfirmation}
                            />
                    </div>
                    <br></br>

                    <Button variant='contained' disabled={loading} className={loading ? 'loading' : ''} size='large' color='secondary' type="submit">Sign up</Button>

                    <div>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
                {errors.length > 0 && (
                    <Alert variant="filled" severity="warning" >
                        <h3>Error</h3>
                        {this.displayErrors(errors)}
                    </Alert>
                )}
            </div>
        )
    }
}

export default SignUpPage