import React, { Component } from "react";
import PlaylistComponent from "../Components/PlaylistComponent";
import { makeStyles } from "@material-ui/core/styles";
import AddorEditPlaylist from "../Components/AddorEditPlaylist";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    position: "relative",
    padding: theme.spacing(11.5, 0.1) //top and sides of element
    //the 11 stops the element beinh hidden behind buttons
  }
}));

const PlaylistsIndexContainer = (props, routerProps) => {
  const classes = useStyles();

  const userPlaylists = playlists => {
    if (playlists.length !== 0) {
      return playlists.filter(
        playlist => playlist.user_id === parseInt(localStorage.currentUser)
      );
    }
  };

  const sortedUserPlaylists = userPlaylists => {
    return userPlaylists.sort(playlist => playlist.created_at).reverse();
  };

  return (
    <div className={classes.root}>
      {props.showPlaylistForm ? (
        <AddorEditPlaylist
          togglePlaylistForm={props.togglePlaylistForm}
          updatePlaylists={props.updatePlaylists}
        />
      ) : null}

      {props.playlists.length !== 0
        ? sortedUserPlaylists(userPlaylists(props.playlists)).map(
            (playlist, i) => (
              <PlaylistComponent
                {...routerProps}
                updatePlaylists={props.updatePlaylists}
                key={i}
                playlist={playlist}
              />
            )
          )
        : null}
    </div>
  );
};

export default PlaylistsIndexContainer;
