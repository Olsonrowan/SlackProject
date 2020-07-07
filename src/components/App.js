import React, { Component } from 'react';
import { 
    BrowserRouter as Router,
    Route,
    NavLink 
} from 'react-router-dom'
import firebase, { db, auth } from '../services/firebase'


// import { signout } from '../services/auth'

import PrivateRoute from './PrivateRoute'


import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage'
// import { AuthProvider } from '../services/auth';
import HomePage from '../pages/HomePage'


class App extends React.Component{
    render(){
        return(
        <div>
            <Router>
                {/* <Route exact path='/'>
                    <HomePage ={} />
                </Route> */}
                <Route  path='/login' component={LoginPage}/>
                <Route  path='/signup' component={SignUpPage}/>

            </Router>
        </div>
        )
    }
}


export default App





// const App = () =>{
    
//         return (
//             <AuthProvider>
//             <Router>
               
//                     <div>
//                     <PrivateRoute exact path="/" component={ HomePage } />
//                     <Route path="/login" component={ LoginPage } />
//                     <Route path="/signup" component={ SignUpPage } />

//                     </div>
//             </Router>
//             </AuthProvider>
//         )
// }

// class App extends React.Component{
//     state ={
//         user: null
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
//         <div className="App">
//             <Router>
//                 <Nav signout={this.signOutUser} user={this.state.user} />
//                 <Route exact path="/" component={Home} />
//                 <Route path="/login" component={ () => <Login signin={this.signInUser} />} />
//                 <Route path="/signup" component={Signup} />
//                 <Route path='/profile' component={() => <Profile user={this.state.user} /> } />

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



// export default App