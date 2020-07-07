import React from 'react'
import firebase, { auth } from '../services/firebase'
import { Link } from 'react-router-dom'
import { signin } from '../services/auth'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



class LoginPage extends React.Component {
    state = {
        user: '',
        email: '',
        password: '',
    }

    componentDidMount(){
    auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({
                user: {
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                }
            })
        } else {
            // No user is signed in.
            this.setState({ user: null })
        }
        });
}

    handleLogin = async (event) => {
        event.preventDefault()
        console.log(event)
    };

    signInUser = () =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        auth().signInWithPopup(provider)
        .then((result) => {
            var user = result.user;
            console.log(user)
          }).catch(function(error) {
           console.log(error)
        });
    }


    handleSubmit = async (event) => {
        event.preventDefault()
        try {
            let { email, password, user } = this.state
            await signin( user, email, password)
            this.success()
        } catch(err) {
            console.log(err)
        }
    };



    success() {
        let { state } = this.props.location
        if (state && state.from) {
            this.props.history.push(state.from.pathname)
        } else {
            this.props.history.push('/')
        }
    };

    error(err) {
        console.log(err)
        alert('Email or Password is not correct')
        this.setState({
            error: err.message
        })
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    
    render() {
        return (
            <div>
                <form className="classes.root"  onSubmit={this.handleSubmit}>
                    <div className="ui container">
                        <div>
                            <h1>Login</h1>
                            <TextField required id="filled-required"
                                 label="Email" 
                                placeholder="Email"
                                type="email"
                                name="email"
                                variant="filled"
                                onChange={ this.handleChange}
                                value={ this.state.email }
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
                                value={ this.state.passord }

                                />
                        </div>
                        <br></br>
                        <Button variant="contained" color="secondary" type="submit" >Login</Button>
                        <Button  variant="outlined" color="primary" onClick={ this.signInUser }> Login Using Google </Button>
                        <div >
                            <p>Don't have an account?<Link to="/signup"> Click to Sign Up!</Link> </p> 
                        </div>
                        
                    </div>
                </form> 
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

//     handleLogin = async (event) => {
//         event.preventDefault()
//         console.log(event)
//     }

//     handleSubmit = async (event) => {
//         event.preventDefault()
//         try {
//             let { email, password } = this.state
//             await signin(email, password)
//             this.success()
//         } catch(err) {
//             this.error(err)
//         }
//     }

//     success() {
//         let { state } = this.props.location
//         if (state && state.from) {
//             this.props.history.push(state.from.pathname)
//         } else {
//             this.props.history.push('/')
//         }
//     }

//     error(err) {
//         console.log(err)
//         alert('Email or Password is not correct')
//         this.setState({
//             error: err.message
//         })
//     }

//     handleChange = (event) => {
//         this.setState({
//             [event.target.name]: event.target.value
//         })
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

//     signInUser = () =>{
//         const provider = new firebase.auth.GoogleAuthProvider();
//         auth().signInWithPopup(provider)
//         .then((result) => {
//             var user = result.user;
//             console.log(user)
//           }).catch(function(error) {
//            console.log(error)
//           });

//     }
//     signOutUser(){
//         auth().signOut()
//     }   
//     render(){ 
//         return(
//         <div className="Login">
//             <Router>
//                 <Nav signout={this.signOutUser} user={this.state.user} />
//                 <Route exact path="/" component={Home} />
//                 <Route path="/login" component={ () => <Login signin={this.signInUser} />} />
//                 {/* <Route path='/profile' component={() => <Profile user={this.state.user} /> } /> */}

//             </Router>
//             { this.state.user &&
//             <div>
//                 <h2>{this.state.user.displayName}</h2>
//                 <img alt="profilepic" src={this.state.user.photoURL} />
//             </div>
//             }
//         </div>
//     )
//   }
// }



// function Nav(props){
//     return(
//         <div>
//             <button>
//                 <NavLink to='/'>Home</NavLink>
//             </button>
//             {
//                 props.user && <button onClick={props.signout}>Sign Out!</button>
//             }
//             {
//                 !props.user &&<button><NavLink to='/login'>Log in</NavLink></button>
//             }
//         </div>
//      )
//     }
    
//     function Home(){
//         return(
//             <div>
//                 <h3>Slack</h3>
//             </div>
//         )
//         }

    
//     function Login(props){
//         return(
//             <div>
//                 <form className='loginform' onSubmit={this.handleSubmit}>
//                 <h2>Login</h2>
//                 <input
//                 placeholder="Email"
//                 type="email"
//                 name='email'
//                 onChange={this.handleChange}
//                 value={this.state.email}
//                 />
//                 <input
//                 placeholder="Password"
//                 type="password"
//                 name="password"
//                 onChange={ this.handleChange }
//                 value={ this.state.passord }

//                 />
//                 </form>
//                 <button onClick={props.signin}>Google</button>
//             </div>
//         )
//         }
    


// export default LoginPage



// class LoginPage extends React.Component {
//     state = {
//         email: '',
//         password: '',
//         error: ''
//     }

//     handleLogin = async (event) => {
//         event.preventDefault()
//         signInWithGoogle()
//         console.log(event)
//     }

//     handleSubmit = async (event) => {
//         event.preventDefault()
//         try {
//             let { email, password } = this.state
//             await signin(email, password)
//             this.success()
//         } catch(err) {
//             this.error(err)
//         }
//     }

//     success() {
//         let { state } = this.props.location
//         if (state && state.from) {
//             this.props.history.push(state.from.pathname)
//         } else {
//             this.props.history.push('/')
//         }
//     }

//     error(err) {
//         console.log(err)
//         alert('Email or Password is not correct')
//         this.setState({
//             error: err.message
//         })
//     }

//     handleChange = (event) => {
//         this.setState({
//             [event.target.name]: event.target.value
//         })
//     }

//     render(){
//         return(
//             <div>
//                 <form className="ui form" onSubmit={this.handleSubmit}>
//                     <div className="ui container">
//                         <div>
//                             <h1>Login</h1>
//                             <input
//                                 placeholder="Email"
//                                 type="email"
//                                 name="email"
//                                 onChange={ this.handleChange}
//                                 value={ this.state.email }
//                             />
//                             <input
//                                 placeholder="Password"
//                                 type="password"
//                                 name="password"
//                                 onChange={ this.handleChange }
//                                 value={ this.state.passord }

//                                 />
//                         </div>

//                         <button className="ui primary basic button " type="submit" >Login</button>
//                         <button className="ui secondary basic button" type="submit" onClick={ this.handleLogin }> Login Using Google </button>

//                         <div >
//                             <p>Don't have an account? <Link to="/signup"> Sign Up!</Link> </p> 
//                         </div>
//                     </div>
//                 </form> 
//             </div>
//         )
//     }
// }


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