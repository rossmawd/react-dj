import React from 'react';
import './App.css';
import PlayListIndexHeader from './Containers/PlayListIndexHeader';       
import PlaylistsIndexContainer from './Containers/PlaylistsIndexContainer';
const PLAYLISTURL = 'http://localhost:3000/v1/playlists'




class App extends React.Component {

  state = {
    playlists: []
  }


  componentDidMount() {
    this.fetchPlaylists()
  }

  fetchPlaylists = () => {
    return fetch(PLAYLISTURL)
    .then(res => res.json())
    .then(playlists => this.setState({playlists}))

  }

  render() {
    return (
      <div className="App">
        <PlayListIndexHeader />
        <PlaylistsIndexContainer playlists={this.state.playlists}/>
      </div>
    );
  }
}

export default App;
