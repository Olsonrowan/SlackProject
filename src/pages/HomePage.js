import React from 'react'
import firebase from 'firebase'

class HomePage extends React.Component{
    render(){
        return(
         <div>
            <button onClick={()=> firebase.auth().signOut()}>Sign Out!</button>
         </div>
        )
    }
}
export default HomePage