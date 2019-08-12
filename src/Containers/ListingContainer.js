import React, { Component } from "react";
//import PlaylistComponent from "../Components/PlaylistComponent";
import ListingComponent from "../Components/ListingComponent";
import EditListingForm from "../Components/EditListingForm";

import { makeStyles } from "@material-ui/core/styles";
import { ResponsivePlayer } from "../Components/ResponsivePlayer";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    position: "relative",
    padding: theme.spacing(11.5, 0.1) //top and sides of element
    //the 11 stops the element beinh hidden behind buttons
  }
}));

const playlistListingsOnly = (listings, playlist) => {
  if (listings) {
    return listings.filter(listing => listing.playlist_id === playlist.id);
  }
};

const renderListings = (props, routerProps) => {

  if (props.listings && props.listings.length !== 0 ) {
    return playlistListingsOnly(props.listings, props.playlist).map(
      (listing, i) => (
        <ListingComponent {...routerProps} key={i} listing={listing} />
      )
    );
  }
};

const ListingContainer = (props, routerProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.showListingsEdit ? <EditListingForm /> :  
      renderListings(props, routerProps)}
    </div>
  );
};

export default ListingContainer;
