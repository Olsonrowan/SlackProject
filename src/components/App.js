import React from 'react';

//design material ui 
import Grid from '@material-ui/core/Grid';

import SideBar from './SideBar'
import ColorPanel from './ColorPanel'
import Messages from './Messages'
import Panel from './Panel'



// import PrivateRoute from './PrivateRoute'


const App = () => (
    <div>
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        >
          
            <Grid item  xs={1}>
                    <ColorPanel/>
            </Grid>

            <Grid item xs={4}>
                <SideBar/>
            </Grid>
            <Grid item xs={5}>
                <Messages />
            </Grid>
            <Grid item xs={2}>
                <Panel/>
            </Grid>

            
        </Grid>
    </div>
)

export default App





// const App = () =>{
    // let [ authenticated, setAuth ] = useState(false)
    // let [ user, setUser ] = useState(null)

    // useEffect( () => {
    //     auth().onAuthStateChanged( user => {
    //         if (user) {
    //             setAuth(true)
    //             setUser(user)
    //             console.log(user)
    //         } else {
    //             setAuth(false)
    //             setUser(null) 
    //         }
    //     })
    // }, [])
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