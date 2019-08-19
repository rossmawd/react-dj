import React from "react";
import "./App.css";
import PlaylistIndexHeader from "./Containers/PlayListIndexHeader";
import PlaylistShowHeader from "./Containers/PlaylistShowHeader";
import PlaylistsIndexContainer from "./Containers/PlaylistsIndexContainer";
import API from "./API.js";
import { Route, Switch } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ListingContainer from "./Containers/ListingContainer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
library.add(fab, faCheckSquare, faCoffee);

const ConditionalComponent = (condition, jsx) => {
  return condition ? jsx : <div>Loading...</div>;
};

class App extends React.Component {
  state = {
    playlists: [],
    user: null,
    email: null,
    password: null,
    showListingsEdit: false,
    showPlaylistForm: false,
    addOrEdit: null
  };

  componentDidMount() {
    this.setCurrentUserFromToken();
  }

  togglePlaylistForm = (edit = false) => {
    this.setState({
      showPlaylistForm: !this.state.showPlaylistForm,
      addOrEdit: edit ? "edit" : "create"
    });
  };

  toggleShowListingsEdit = () => {
    this.setState({ showListingsEdit: !this.state.showListingsEdit });
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
    return API.fetchAllPlaylists().then(playlists =>
      this.setState({ playlists })
    );
  };

  getPlaylist = id => {
    API.getPlaylist(id).then(playlist => {
      this.setState({ playlists: [...this.state.playlists, playlist] })
    });
  };

  setCurrentUserFromToken = () => {
    let token = localStorage.token ? localStorage.token : null;

    if (token) {
      API.validateUser().then(user => {
        this.setState({ user, playlists: user.playlists });
      });
    }
  };

  createUser = user => {
    API.signUp(user)
      .then(user => this.setState({ user, playlists: user.playlists }))
      .then(() => {
        console.log(this.props.history);
        this.props.history.push("/playlists");
      })
      .catch(errors => {
        this.setState({ errors });
        alert(errors);
      });
  };

  logIn = user => {
    API.logIn(user)
      .then(user => this.setState({ user, playlists: user.playlists }))
      .then(() => this.props.history.push("/playlists"))
      .catch(errors => {
        this.setState({ errors });
        alert(errors);
      });
  };

   handleSignInSubmit = e => {
    e.preventDefault();
    let submittedUser = {
      email: this.state.email,
      password: this.state.password
    };
    this.logIn(submittedUser);
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


  render() {
    console.log("APP HAS RENDERED");
    return (
      <div className="App">
        <Switch>
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
            render={routerProps =>
              ConditionalComponent(
                this.state.playlists && this.state.playlists.length > 0,
                <>
                  <PlaylistIndexHeader
                    {...routerProps}
                    clearCurrentUser={this.clearCurrentUser}
                    togglePlaylistForm={this.togglePlaylistForm}
                  />
                  <PlaylistsIndexContainer
                    {...routerProps}
                    playlists={this.state.playlists}
                    updatePlaylists={this.fetchPlaylists}
                    showPlaylistForm={this.state.showPlaylistForm}
                    togglePlaylistForm={this.togglePlaylistForm}
                    addOrEdit={this.state.addOrEdit}
                  />
                </>
              )
            }
          />

          <Route
            exact
            path="/playlist/:id"
            component={routerProps => {
             
             
              
              const playlist = this.state.playlists.find(
                playlist =>
                  playlist.id === parseInt(routerProps.match.params.id)
              );
            

              if (!playlist) {
                
                //i.e no playlists in state as NO USER
                this.getPlaylist(routerProps.match.params.id);
                return null;
              }

            
              console.log("render called", playlist);
              return ConditionalComponent(
                !!playlist, //the const above...either there is a user and it is asigned straight away OR getPlaylist changes state and it assignes 2nd time around
                <>
                  <PlaylistShowHeader
                    {...routerProps}
                    currentUser={this.state.user}
                    clearCurrentUser={this.clearCurrentUser}
                    toggleShowListingsEdit={this.toggleShowListingsEdit}
                    playlist={playlist}
                  />

                  <ListingContainer
                    currentUser={this.state.user}
                    playlist={playlist}
                    getPlaylist={this.getPlaylist}
                    showListingsEdit={this.state.showListingsEdit}
                    toggleShowListingsEdit={this.toggleShowListingsEdit}
                    setCurrentUserFromToken={this.setCurrentUserFromToken}
                  />
                </>
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
