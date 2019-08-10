import React from 'react';
import './App.css';
import PlayListIndexHeader from './Containers/PlayListIndexHeader';       
import PlaylistsIndexContainer from './Containers/PlaylistsIndexContainer';
import API from "./API.js";
import { Route, Switch } from "react-router-dom";
import SignIn from './SignIn';
const PLAYLISTURL = 'http://localhost:3000/api/v1/playlists'


class App extends React.Component {

  state = {
    playlists: [],
    user: {},
    email: null,
    password: null

  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    
  }


  componentDidMount() {
    this.fetchPlaylists()
    this.setCurrentUserFromToken()
  }

  fetchPlaylists = () => {
    return fetch(PLAYLISTURL)
    .then(res => res.json())
    .then(playlists => this.setState({playlists}))

  }

  setCurrentUserFromToken = () => {
    let token = localStorage.token ? localStorage.token : null

    if (token){
      API.validateUser().then(user => {
        this.setState({user})
      })  
    }
  }

  createUserOrSignIn = (showLogIn) => {

    console.log(showLogIn ? "Logging in..." : "Signing up...")
    let user = { username: this.state.username, password: this.state.password }
    if (showLogIn) {
      this.logIn(user)
    }
    else {
      this.createUser(user)
    }
  }

  createUser = user => {
    API.signUp(user).then(userData => this.setState({ user: userData }))
      .then(() => {
        console.log(this.props.history)
        this.props.history.push('/game')})
      .catch(errors => {
        this.setState({ errors })
        alert(errors)
      })
  }

  logIn = user => {
    API.logIn(user).then(userData => this.setState({ user: userData }))
      .then(() => this.props.history.push('/game'))
      .catch(errors => {
        this.setState({ errors })
        alert(errors)
      })
  };

  renderWelcomePage = (routerProps) => {
    
    return(
  
   <SignIn {...routerProps} handleFormChange={this.handleFormChange}/>
    )
  }

  

  render() {
    console.log("APP HAS RENDERED")
    return (
      <div className="App">
        

        <React.Fragment>
            
            <Switch>
              <Route exact path="/test" render={() => <h1>Home!</h1>} />
              {/* <Route exact path="/scores" component={HighScoreContainer} /> */}

             
              <Route exact path='/' render={routerProps =>
               {return this.renderWelcomePage(routerProps)}
              }
              />
              
              <Route exact path='/playlists' render={routerProps =>
              <>
              <PlayListIndexHeader />
              <PlaylistsIndexContainer playlists={this.state.playlists}/>  
              </>   
              }
              />
            </Switch>
          </React.Fragment>
      </div>
    );
  }
}

export default App;
