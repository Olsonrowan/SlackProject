import React from 'react'
import { Link } from 'react-router-dom'

//material ui design imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../services/firebase'
import Alert from '@material-ui/lab/Alert';
//redux




class LoginPage extends React.Component {
    state = {
        email: '',
        password: '',
        errors: [],
        loading: false,
    };



    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)){
        this.setState({ errors: [], loading: true});
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
            console.log(signedInUser);
        })
        .catch(err =>{
            console.error(err);
            this.setState({
                errors: this.state.errors.concat(err),
                loading: false
            });
        });
         }
    }

    isFormValid = ({ email, password }) => email && password;
    

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

   
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
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
            email,
            password,
            errors,
            loading,
        } = this.state;

        return (
            <div className="container">
                <form className="classes.root" onSubmit={this.handleSubmit}>
                    <div>
                        <h1>Welcome! Login to class chatter!</h1>
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
                            
                    </div>
                    <br></br>

                    <Button variant='contained' disabled={loading} className={loading ? 'loading' : ''} size='large' color='primary' type="submit">LOGIN</Button>

                    <div>
                        <p>Dont have an account? <Link to="/signup">sign up!</Link></p>
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

export default LoginPage





// class LoginPage extends React.Component{
//     state ={
//         user: null,
//         email: '',
//         Password: '',
//         error: ''

//     }





//     componentDidMount(){
//         auth().onAuthStateChanged((user) => {
//             if (user) {
//                 this.setState({
//                     user: {
//                         photoURL: user.photoURL,
//                         displayName: user.displayName,
//                     }
//                 })
//             } else {
//               // No user is signed in.
//               this.setState({ user: null })
//             }
//           });
//     }


// export default LoginPage

// firebase.initializeApp({
//     apiKey: "AIzaSyA15xf-hsjSbgCBV4yy_3HWJtPO-2qrbjo",
//     authDomain: "classchatter-83971.firebaseapp.com"
// })


// class LoginPage extends React.Component {
//     state = { isSignedIn: false }
//     uiConfig = {
//         signInFlow: "popup",
//         signInOptions: [
//             firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//             firebase.auth.GithubAuthProvider.PROVIDER_ID,
//         ],
//         callbacks: {
//             signInSuccess: () => false
//         }
//     }

//         componentDidMount = () =>{
//         firebase.auth().onAuthStateChanged(user => {
//             this.setState({isSignedIn: !!user})
//             console.log("user",user)
//         })

//     }


//     render(){
//         return (
//             <div>
//                 {this.state.isSignedIn ? (
//                 <span>
                  
//                   <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
//                   <img
//                    alt="profile" 
//                    src={firebase.auth().currentUser.photoURL}
//                    />
//                 </span>
//                 ) : (
//                     <div>
//                     <h1 className="welcome-header">Class Chatter!</h1>
//                 <StyledFirebaseAuth uiConfig={this.uiConfig}
//                 firebaseAuth={firebase.auth()} />
//                 </div>
//                  )}
//             </div>

//         )
//     }
// }

// export default LoginPage




// <Segment placeholder>
//           <Grid columns={1} relaxed='very' stackable>
//             <Grid.Column>
//               <Form>
//                 <Form.Input
//                   icon='user'
//                   iconPosition='left'
//                   label='Username'
//                   placeholder='Username'
//                 />
//                 <Form.Input
//                   icon='lock'
//                   iconPosition='left'
//                   label='Password'
//                   type='password'
//                 />
      
//                 <Button content='Login' primary />
//                 <Grid.Column verticalAlign='middle'>
//                     <br></br>
//         <Button content='Sign up' icon='signup'  />
//       </Grid.Column>
//               </Form>
//               </Grid.Column>
//           </Grid>
//          </Segment>