import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom'
import firebase from './services/firebase'

//pages
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

//loading
import Spinner from './components/Spinner'

//redux
import {createStore} from 'redux'
import { Provider, connect } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

//actions and reducers
import rootReducer from './reducers';
import { setUser } from './actions/index'

const store = createStore(rootReducer, composeWithDevTools());


class Root extends React.Component{
  componentDidMount(){
    console.log(this.props.isLoading)
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.props.setUser(user);
        this.props.history.push('/');
      }
    })
  }
  render(){
    return this.props.isLoading ? <Spinner /> : (
    
        <Switch>
          <Route path="/" component={App} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />

        </Switch>
    )
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
})

const RootWithAuth = withRouter(connect(mapStateFromProps, { setUser })(Root));

ReactDOM.render(
    <Provider store={store}>
      <Router>
          <RootWithAuth />
      </Router>
    </Provider>,
          document.getElementById('root')
  );
