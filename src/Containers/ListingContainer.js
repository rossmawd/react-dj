import React from "react";
import ListingComponent from "../Components/ListingComponent";
import EditListingForm from "../Components/EditListingForm";
import { makeStyles } from "@material-ui/core/styles";
import { ListItemIcon } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    position: "relative",
    padding: theme.spacing(11.5, 0.1) //top and sides of element
    //the 11 stops the element beinh hidden behind buttons
  }
}));

const ListingContainer = (props, routerProps) => {
    const classes = useStyles();
    const { listings, playlist, currentUser, updateListings } = props;
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

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
      //debugger
      return playlistListingsOnly(listings, playlist).filteredListings.sort( listing => listing.position).reverse()

    }

    const renderListings = () => {
      if (listings && listings.length !== 0) {
        return sortListings().map((listing, i) => (
          <ListingComponent {...routerProps} key={i} listing={listing} updateListings={updateListings}
          forceUpdate={forceUpdate}
          />
        ));
      }
    };

    return (
      <div className={classes.root}>
        {props.showListingsEdit ? (
          <EditListingForm
            {...routerProps}
            playlist={props.playlist}
            playlistLength={
              playlistListingsOnly().listingCount
            }
            toggleShowListingsEdit={props.toggleShowListingsEdit}
            updateListings={updateListings}
          />
        ) : (
          renderListings()
        )}
      </div>
    );
};

export default ListingContainer;
