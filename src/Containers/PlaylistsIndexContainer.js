import React, { Component } from 'react';
import PlaylistComponent from '../Components/PlaylistComponent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    padding: theme.spacing(11.5, 0.1), //top and sides of element
    //the 11 stops the element beinh hidden behind buttons
  },

}));

 const PlaylistsIndexContainer = (props) => {
  const classes = useStyles();
    return (
      <div className= {classes.root}>
        { props.playlists.length !== 0  ? 
          props.playlists.map(playlist => <PlaylistComponent playlist={playlist}/>) : null }
        
      </div>
    );
  }


export default PlaylistsIndexContainer;