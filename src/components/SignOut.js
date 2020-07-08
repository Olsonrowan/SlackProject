import React from 'react';
import firebase from '../services/firebase'

class SignOut extends React.Component{
  handleSignOut = () =>{
    firebase
    .auth()
    .signOut()
    .then(() => console.log('signed out'))

  }
  render(){
    return(
      <div>
        
      </div>
    )
  }
}

export default SignOut