import React, { Component } from "react";
//import PlaylistComponent from "../Components/PlaylistComponent";
import ListingComponent from '../Components/ListingComponent'

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    position: "relative",
    padding: theme.spacing(11.5, 0.1) //top and sides of element
    //the 11 stops the element beinh hidden behind buttons
  }
}));

// const userPlaylists = playlists => {
//   if (playlists.length !== 0) {
//     return playlists.filter(
//       playlist => playlist.user_id === parseInt(localStorage.currentUser)
//     );
//   }
// };


const ListingContainer = (props, routerProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <ListingComponent /> */}
      {props.listings.length !== 0
        ? props.listings.map((listing, i) => (
            <ListingComponent 
            {...routerProps}
            key={i} 
            listing={listing} 
           
            />
          ))
        : null}
    </div>
  );
};

export default ListingContainer;
