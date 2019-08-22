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
import ActionCable from 'actioncable'
import GoogleFontLoader from 'react-google-font-loader';
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
    addOrEdit: null,
    text: "",
    showFilterForm: false,
    playlistFilter: "All"
  };

  setPlaylistFilter = (genre) => {
    this.setState({ playlistFilter: genre })
  }

  toggleFilterForm = () => {
    this.setState({ showFilterForm: !this.state.showFilterForm })
  }

  componentDidMount() {
    this.setCurrentUserFromToken();
       
    // ACTION CABLE
    window.fetch("https://backend-react-dj.herokuapp.com/notes/1").then(data => {
      
      data.json().then(res => {
        this.setState({ text: res.text });

      });
    });

    const cable = ActionCable.createConsumer('ws://backend-react-dj.herokuapp.com/cable')

    this.sub = cable.subscriptions.create('NotesChannel', {
      received: this.handleReceiveNewText
    })
  }

  //ACTION CABLE start
  handleChange = e => {
    this.setState({ text: e.target.value })
    this.sub.send({ text: e.target.value, id: 1 }) //sends changes to the backend 

  }

  handleReceiveNewText = ({ text, listing_id, playlist_id }) => {


    if (text !== this.state.text) {
      this.setState({ text })
    }

    // let playlist =  this.state.playlists.filter(playlist => playlist.id === parseInt(playlist_id))
    // let listing = playlist.listings.filter(listing => )
    this.getPlaylist(parseInt(playlist_id))


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
      let currentPlaylists = this.state.playlists
      let playlistsMinusOne = currentPlaylists.filter(p => p.id !== playlist.id)
      this.setState({ playlists: [...playlistsMinusOne, playlist] }); // spreading in the playlist was causing a duplicate!!
    });
  };

  updatePlaylist = updatedPlaylist => {
    this.setState({
      playlists: this.state.playlists.map(playlist =>
        playlist.id === updatedPlaylist.id ? updatedPlaylist : playlist
      )
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
    //console.log("APP HAS RENDERED");
    return (
      <div className="App">
        <GoogleFontLoader
          fonts={[
            {
              font: 'Roboto',
              weights: [400, '400i'],
            },
            {
              font: 'Roboto Mono',
              weights: [400, 700],
            },
          ]}
          subsets={['cyrillic-ext', 'greek']}
        />
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
                    playlistFilter={this.state.playlistFilter}
                    setPlaylistFilter={this.setPlaylistFilter}
                    clearCurrentUser={this.clearCurrentUser}
                    togglePlaylistForm={this.togglePlaylistForm}
                    showPlaylistForm={this.state.showPlaylistForm}
                    toggleFilterForm={this.toggleFilterForm}
                    showFilterForm={this.state.showFilterForm}
                  />

                  <PlaylistsIndexContainer
                    {...routerProps}
                    currentUser={this.state.user}
                    playlists={this.state.playlists}
                    getPlaylist={this.getPlaylist}
                    updatePlaylists={this.fetchPlaylists}
                    showPlaylistForm={this.state.showPlaylistForm}
                    togglePlaylistForm={this.togglePlaylistForm}
                    addOrEdit={this.state.addOrEdit}
                    toggleFilterForm={this.toggleFilterForm}
                    showFilterForm={this.state.showFilterForm}
                    playlistFilter={this.state.playlistFilter}
                    setPlaylistFilter={this.setPlaylistFilter}
                  />
                </>
              )
            }
          />

          <Route
            exact
            path="/playlist/:id"
            render={routerProps => {
              const playlist = this.state.playlists.find(
                playlist =>
                  playlist.id === parseInt(routerProps.match.params.id)
              );

              if (!playlist) {
                //i.e no playlists in state as NO USER
                this.getPlaylist(routerProps.match.params.id);
                return null;
              }

              return ConditionalComponent(
                !!playlist, //the const above...either there is a user and it is asigned straight away OR getPlaylist changes state and it assignes 2nd time around
                <>
                  <PlaylistShowHeader
                    {...routerProps}
                    currentUser={this.state.user}
                    clearCurrentUser={this.clearCurrentUser}
                    toggleShowListingsEdit={this.toggleShowListingsEdit}
                    playlist={playlist}
                    text={this.state.text}
                    changeText={this.handleChange}

                  />

                  <ListingContainer
                    updatePlaylist={this.updatePlaylist}
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
          <Route component={() => <h1>404 - Page not Found ;-p</h1>} />
        </Switch>

      </div>
    );
  }
}

export default App;
