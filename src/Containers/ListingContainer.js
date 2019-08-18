import React from "react";
import { useState } from "react";
import ListingComponent from "../Components/ListingComponent";
import EditListingForm from "../Components/EditListingForm";
import { makeStyles } from "@material-ui/core/styles";
import BottomAppBar from "../Components/BottomAppBar";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    position: "relative",
    padding: theme.spacing(11.5, 0.1) //top and sides of element
    //the 11 stops the element beinh hidden behind buttons
  },
  wrapper: {
    width: "100%",
    position: "fixed",
    zIndex: "1"
  },
  paper: {
    zIndex: 1,
    position: "relative",
    margin: theme.spacing(1)
  }
}));

const ListingContainer = (props, routerProps) => {
  const classes = useStyles();
  const { playlist, currentUser } = props;
  const [isPlaying, setPlaying] = useState(false);
  const sortListings = () => {
    return playlist.listings.sort((a, b) => a.position - b.position).reverse();
  };
  const [currentListing, setCurrentListing] = useState({
    ...sortListings()[0]
  });

  console.log("listing container render", playlist);

  const triggerNextSong = id => {
    console.log("trigger next song", playlist);
    console.log("triggerNextSong fired!");

    const prev = playlist.listings.find(listing => listing.id === id);
    console.log("the prev track is NOW in position", prev.position);

    const next = playlist.listings.find(
      listing => listing.position === prev.position - 1
    );
    if (next) {
      console.log("the next track is in position", next.position);
      console.log("The new current Listing is", next);
      setCurrentListing({ ...next });
    } else {
      alert("Playlist Over!");
    }
  };

  const renderListings = () => {
    if (playlist.listings && playlist.listings.length !== 0) {
      
      return sortListings().map((listing, i) => (
        <ListingComponent
          {...routerProps}
          key={listing.id}
          listing={listing}
          setCurrentListing={setCurrentListing}
          currentListing={currentListing}
          setPlaying={setPlaying}
          isPlaying={isPlaying}
          showAdminControls={!!currentUser && (playlist.user_id === currentUser.id)}
          setCurrentUserFromToken={props.setCurrentUserFromToken}
          getPlaylist={props.getPlaylist}
          currentUser={currentUser}
        />
      ));
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Slide
          timeout={500}
          direction="left"
          in={props.showListingsEdit}
          mountOnEnter
          unmountOnExit
        >
          <Paper elevation={4} className={classes.paper}>
            <EditListingForm
              {...routerProps}
              playlist={props.playlist}
              playlistLength={playlist.listings.length}
              toggleShowListingsEdit={props.toggleShowListingsEdit}
              setCurrentUserFromToken={props.setCurrentUserFromToken}
            />
          </Paper>
        </Slide>

      </div>
      {renderListings()}
      <BottomAppBar
        currentListing={currentListing}
        triggerNextSong={id => triggerNextSong(id)}
        setPlaying={setPlaying}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default ListingContainer;
