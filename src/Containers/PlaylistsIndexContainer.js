import React, { Component } from 'react';
import PlaylistComponent from '../Components/PlaylistComponent';

class PlaylistsIndexContainer extends Component {
  render() {
    return (
      <div>
        { this.props.playlists.length !== 0  ? 
          this.props.playlists.map(playlist => <PlaylistComponent playlist={playlist}/>) : null }
        
      </div>
    );
  }
}

export default PlaylistsIndexContainer;