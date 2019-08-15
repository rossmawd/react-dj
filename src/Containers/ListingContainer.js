import React from "react";
import { useState } from "react";
import ListingComponent from "../Components/ListingComponent";
import EditListingForm from "../Components/EditListingForm";
import { makeStyles } from "@material-ui/core/styles";
import BottomAppBar from "../Components/BottomAppBar";

import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';


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
    position: 'relative',
    margin: theme.spacing(1),
  },

}));

const ListingContainer = (props, routerProps) => {
  const classes = useStyles();
 
  const { listings, playlist, currentUser, updateListings } = props;
  const [currentListing, setCurrentListing] = useState(listings[listings.length -1]);
  const [isPlaying, setPlaying] = useState(false);


  const triggerNextSong = (id) => {
   
    const prev = listings.find(listing => listing.id === id)
    console.log("the prev track was in position", prev.position)
   
    const next = listings.find(listing => listing.position === prev.position - 1)
    if (next) {
    console.log("the next track is in position", next.position)
  
    setCurrentListing(next)
    } else {
      alert("Playlist Over!")
    }

}
  

  const playlistListingsOnly = () => {
    let listingCount = 0;

    if (listings && playlist) {
      let filteredListings = listings.filter(
        listing => listing.playlist_id === playlist.id
      );
      listingCount = filteredListings.length;

      return { filteredListings, listingCount };
    }
  };

  const sortListings = () => {

    return playlistListingsOnly(listings, playlist).filteredListings.sort((a, b) => a.position - b.position).reverse()

  }

  const renderListings = () => {
  
    if (listings && listings.length !== 0) {
      return sortListings().map((listing, i) => (
        <ListingComponent
          {...routerProps}
          key={listing.id}
          listing={listing}
          setCurrentListing={setCurrentListing}
          setPlaying={setPlaying}
          isPlaying={isPlaying}
        
          showUpDownButtons={!!currentUser}
          setCurrentUserFromToken={props.setCurrentUserFromToken}
        />
      ));
    }
  };

  return (
    <div className={classes.root}>

      <div className={classes.wrapper}>

        <Slide timeout={500} direction="left" in={props.showListingsEdit} mountOnEnter unmountOnExit>
          <Paper elevation={4} className={classes.paper}>

            <EditListingForm
              {...routerProps}
              playlist={props.playlist}
              playlistLength={
                playlistListingsOnly().listingCount
              }
              toggleShowListingsEdit = {props.toggleShowListingsEdit}
              setCurrentUserFromToken = {props.setCurrentUserFromToken}
            />

          </Paper>
        </Slide>
      </div>
      {renderListings()}
      <BottomAppBar 
        currentListing={currentListing}
        triggerNextSong={triggerNextSong}
        setPlaying={setPlaying}
        isPlaying={isPlaying}

      
      />
    </div>
  );
};

export default ListingContainer;
