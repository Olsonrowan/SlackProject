import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom'
import firebase from './services/firebase'
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';


//redux
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(()=>{}, composeWithDevTools());


class Root extends React.Component{
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.props.history.push('/');
      }
    })
  }
  render(){
    return(
        <Switch>
          <Route path="/" component={App} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />

        </Switch>
    )
  }
}

const RootWithAuth = withRouter(Root);

ReactDOM.render(
    <React.StrictMode>
    <Provider store={store}>
      <Router>
          <RootWithAuth />
      </Router>
    </Provider>
      
    </React.StrictMode>,
    document.getElementById('root')
  );
