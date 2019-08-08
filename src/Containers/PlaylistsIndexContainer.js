import React, { Component } from 'react';
import PlaylistComponent from '../Components/PlaylistComponent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 0.1), //top and sides of element
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(0.2)}px auto`, //space between divs
    padding: theme.spacing(2), //space between components in div
    backgroundColor: "grey"
  },
}));

 const PlaylistsIndexContainer = (props) => {
  const classes = useStyles();
    return (
      <div>
        { props.playlists.length !== 0  ? 
          props.playlists.map(playlist => <PlaylistComponent playlist={playlist}/>) : null }
        
      </div>
    );
  }


export default PlaylistsIndexContainer;