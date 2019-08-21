import React from "react";
import PlaylistComponent from "../Components/PlaylistComponent";
import { makeStyles } from "@material-ui/core/styles";
import AddorEditPlaylist from "../Components/AddorEditPlaylist";
import { useState, useEffect } from "react";
import DialogSelect from "../Components/DialogSelect";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


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
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const MySwal = withReactContent(Swal);

  // useEffect(() => {
  //   console.log('MOUNT')
  //   props.updatePlaylists()
  //   // returned function will be called on component unmount 
  //   return () => {
  //     console.log('UNMOUNT')
  //   }
  // }, [])

  const userPlaylists = playlists => {
    if (playlists.length !== 0) {
      return playlists.filter(
        playlist => playlist.user_id === parseInt(localStorage.currentUser)
      );
    }
  };

  const sortedUserPlaylists = userPlaylists => {
    let sorted_playlists = userPlaylists.sort(playlist => playlist.created_at).reverse();
    if ((props.playlistFilter) === "All") {
    return sorted_playlists
    }  else {
     return filteredPlaylists(sorted_playlists)
    }

  };

  const filteredPlaylists = (playlists) => {
    let filtered_playlists = playlists.filter(playlist => playlist.genre === props.playlistFilter)

    if (filtered_playlists.length === 0){
      MySwal.fire({
        type: 'error',
        title: 'Oops...',
        text: "You don't have any playlists of that genre!",
        footer: 'Click the pencil above to add one!'
      })
      props.setPlaylistFilter("All")
      return playlists 
    }

    return filtered_playlists
  }

  return (
    <div className={classes.root}>

      <DialogSelect
        toggleFilterForm={props.toggleFilterForm}
        showFilterForm={props.showFilterForm}
        playlistFilter={props.playlistFilter}
        setPlaylistFilter={props.setPlaylistFilter}

      />

      <AddorEditPlaylist
        selectedPlaylist={selectedPlaylist}
        togglePlaylistForm={props.togglePlaylistForm}
        showPlaylistForm={props.showPlaylistForm}
        updatePlaylists={props.updatePlaylists}
        getPlaylist={props.getPlaylist}
        addOrEdit={props.addOrEdit}
      />


      {props.playlists.length !== 0
        ? sortedUserPlaylists(userPlaylists(props.playlists)).map(
          (playlist, i) => (
            <PlaylistComponent
              setSelectedPlaylist={setSelectedPlaylist}
              {...routerProps}
              updatePlaylists={props.updatePlaylists}
              key={playlist.id}
              playlist={playlist}
              togglePlaylistForm={props.togglePlaylistForm}
            />
          )
        )
        : <h3>No Playlists Here!</h3>}
    </div>
  );
};

export default PlaylistsIndexContainer;
