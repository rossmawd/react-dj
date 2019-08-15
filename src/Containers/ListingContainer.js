import React from "react";
import { useState } from "react";
import ListingComponent from "../Components/ListingComponent";
import EditListingForm from "../Components/EditListingForm";
import { makeStyles } from "@material-ui/core/styles";

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
    const [currentlyPlaying, setPlaying] = useState(null);
    const [playerCount, addPlayer] = useState(0);
    const [currentUrl, setUrl] = useState(null);


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
      
      return playlistListingsOnly(listings, playlist).filteredListings.sort( (a,b) => a.position - b.position).reverse()

    }

    const renderListings = () => {
      if (listings && listings.length !== 0) {
        return sortListings().map((listing, i) => (
          <ListingComponent 
            {...routerProps} 
            key={listing.id} 
            listing={listing} 
            updateListings={updateListings}
            currentlyPlaying={currentlyPlaying}
            currentUrl={currentUrl}
            setUrl={setUrl}
            setPlaying={setPlaying}
            playerCount={playerCount}
            addPlayer={addPlayer}
          />
        ));
      }
    };

    
    

    return (
      <div className={classes.root}>

        <div className={classes.wrapper}>
      
        <Slide  timeout={500} direction="left" in={props.showListingsEdit} mountOnEnter unmountOnExit>
          <Paper elevation={4} className={classes.paper}>
         
          <EditListingForm
            {...routerProps}
            playlist={props.playlist}
            playlistLength={
              playlistListingsOnly().listingCount
            }
            toggleShowListingsEdit={props.toggleShowListingsEdit}
            updateListings={updateListings}
          />
       
          </Paper>
        </Slide>
      </div>

{renderListings()}
      </div>
    );
};

export default ListingContainer;
