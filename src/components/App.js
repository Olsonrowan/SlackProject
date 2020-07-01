import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'


firebase.initializeApp({
    apiKey: "AIzaSyA15xf-hsjSbgCBV4yy_3HWJtPO-2qrbjo",
    authDomain: "classchatter-83971.firebaseapp.com"
})


class App extends Component{
    state = { isSignedIn: false }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    componentDidMount = () =>{
        firebase.auth().onAuthStateChanged(user => {
            this.setState({isSignedIn: !!user})
            console.log("user",user)
        })

    }

    render(){
        return (
            <div>
                {this.state.isSignedIn ? (
                <span>
                  <div>You Are Signed in!</div>
                  <button onClick={()=> firebase.auth().signOut()}>Sign Out!</button>
                  <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                  <img
                   alt="profile picture" 
                   src={firebase.auth().currentUser.photoURL}
                   />
                </span>
                ) : (
                <StyledFirebaseAuth uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()} />
                 )}
            </div>

        )
    }
}

export default App