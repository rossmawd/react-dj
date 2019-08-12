import React from "react";
import "./App.css";
import PlaylistIndexHeader from "./Containers/PlaylistIndexHeader";
import PlaylistShowHeader from "./Containers/PlaylistShowHeader";
import PlaylistsIndexContainer from "./Containers/PlaylistsIndexContainer";
import API from "./API.js";
import { Route, Switch } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ListingContainer from "./Containers/ListingContainer";
const PLAYLISTURL = "http://localhost:3000/api/v1/playlists";

class App extends React.Component {
  state = {
    playlists: [],
    user: {},
    email: null,
    password: null,
    listings: {}
  };

  componentDidMount() { 
    this.updateListings()
    this.fetchPlaylists()
    this.setCurrentUserFromToken() 
  }

  updateListings = () => {
    return API.fetchAllListings().then(listings => this.setState({listings}))
  };

  clearCurrentUser = () => {
    this.setState({
      user: null
    });
  };

  handleFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  fetchPlaylists = () => {
    return fetch(PLAYLISTURL)
      .then(res => res.json())
      .then(playlists => this.setState({ playlists }));
  };

  setCurrentUserFromToken = () => {
    let token = localStorage.token ? localStorage.token : null;

    if (token) {
      API.validateUser().then(user => {
        this.setState({ user });
      });
    }
  };

  // createUserOrSignIn = (showLogIn) => {

  //   console.log(showLogIn ? "Logging in..." : "Signing up...")
  //   let user = { username: this.state.username, password: this.state.password }
  //   if (showLogIn) {
  //     this.logIn(user)
  //   }
  //   else {
  //     this.createUser(user)
  //   }
  // }

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

  handleSignInSubmit = e => {
    e.preventDefault();
    let submittedUser = {
      email: this.state.email,
      password: this.state.password
    };
    this.logIn(submittedUser);
  };

  logIn = user => {
    API.logIn(user)
      .then(userData => this.setState({ user: userData }))
      .then(() => this.props.history.push("/playlists"))
      .catch(errors => {
        this.setState({ errors });
        alert(errors);
      });
  };

  renderWelcomePage = routerProps => {
    return (
      <SignIn
        {...routerProps}
        handleFormChange={this.handleFormChange}
        handleSignInSubmit={this.handleSignInSubmit}
      />
    );
  };

  returnPlaylistRoute = playlist => {
    return (
      <Route
        key={playlist.id}
        exact
        path={`/playlist/${playlist.id}`}
        render={routerProps => (
          <>
            <PlaylistShowHeader
              {...routerProps}
              clearCurrentUser={this.clearCurrentUser}
            />

            <ListingContainer
              updateListings={this.updateListings}
              listings={this.state.listings}
            />
          </>
        )}
      />
    );
  };

  render() {
    console.log("APP HAS RENDERED");
    return (
      <div className="App">
        <React.Fragment>
          <Switch>
            <Route exact path="/test" render={() => <h1>Home!</h1>} />
            {/* <Route exact path="/scores" component={HighScoreContainer} /> */}

            <Route
              exact
              path="/"
              render={routerProps => {
                return this.renderWelcomePage(routerProps);
              }}
            />

            <Route
              exact
              path="/signup"
              render={routerProps => <SignUp {...routerProps} />}
            />

            <Route
              exact
              path="/playlists"
              render={routerProps => (
                <>
                  <PlaylistIndexHeader
                    {...routerProps}
                    clearCurrentUser={this.clearCurrentUser}
                  />
                  <PlaylistsIndexContainer
                    {...routerProps}
                    playlists={this.state.playlists}
                  />
                </>
              )}
            />

            {this.state.playlists.map(playlist =>
              this.returnPlaylistRoute(playlist)
            )}
          </Switch>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
