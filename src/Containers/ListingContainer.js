import React from "react";
import { useState, useEffect, useRef } from "react";
import ListingComponent from "../Components/ListingComponent";
import EditListingForm from "../Components/EditListingForm";
import { makeStyles } from "@material-ui/core/styles";
import BottomAppBar from "../Components/BottomAppBar";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import DialogSelect from '../Components/DialogSelect';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

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

// function useForceUpdate(){
//   const [value, set] = useState(true); //boolean state

//   return () => set(!value); // toggle the state to force render
// }

const ListingContainer = (props, routerProps) => {
  const classes = useStyles();
  // const forceUpdate = useForceUpdate()
  const { playlist, currentUser } = props;
  const [isPlaying, setPlaying] = useState(false);
  // var Scroll = require('react-scroll');
  // var Element = Scroll.Element;
  // var scroller = Scroll.scroller;

  const MySwal = withReactContent(Swal);
  //const newTrack = useRef(null);
  let count = 0
  const sortListings = () => {
    return playlist.listings.sort((a, b) => a.position - b.position).reverse();
  };
  const [currentListing, setCurrentListing] = useState(() => {
    return {
      ...sortListings()[0]
    }
  });


  const determineNextLisiting = () => {

    let currentlyPlaying = playlist.listings.find(listing => listing.id === currentListing.id)
    let upNextPosition = currentlyPlaying.position - 1
    let nextLising = playlist.listings.find(listing => listing.position === upNextPosition)
    //debugger
  }

  const triggerNextSong = id => {
    //determineNextLisiting()
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

  useEffect(() => { //Prevents displaying the error on re-render
    if (playlist.listings && playlist.listings.length === 0) {

      Swal.fire(
        'Welcome to your new Playlist!',
        'Click the pencil above to add a song',
        'info'
      )
    }
  });

  const scrollOnCreate = () => {
    scroll.scrollToTop();
  }

  const renderListings = () => {


    if (playlist.listings && playlist.listings.length !== 0) {

      return sortListings().map((listing, i) => (
        <Element name={listing.url}>
          <ListingComponent
            {...routerProps}
            name={listing.url}
            key={listing.id}
            listing={listing}
            setCurrentListing={setCurrentListing}
            currentListing={currentListing}
            // nextLising={nextListing}
            // setNextListing={setNextListing}
            determineNextLisiting={determineNextLisiting}
            setPlaying={setPlaying}
            isPlaying={isPlaying}
            showAdminControls={!!currentUser && (playlist.user_id === currentUser.id)}
            setCurrentUserFromToken={props.setCurrentUserFromToken}
            getPlaylist={props.getPlaylist}
            currentUser={currentUser}
            updatePlaylist={props.updatePlaylist}
          // forceUpdate={forceUpdate}
          />
        </Element>
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
              scrollOnCreate={scrollOnCreate}
              playlistLength={playlist.listings.length}
              getPlaylist={props.getPlaylist}
              toggleShowListingsEdit={props.toggleShowListingsEdit}
              setCurrentUserFromToken={props.setCurrentUserFromToken}
              showAdminControls={!!currentUser && (playlist.user_id === currentUser.id)}
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
        setCurrentListing={setCurrentListing}
      />
    </div>
  );
};

export default ListingContainer;
