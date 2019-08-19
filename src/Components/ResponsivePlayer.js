import ReactPlayer from "react-player";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  playerWrapper: {
    //  position: "relative",
    //  paddingTop: "56.25% /* Player ratio: 100 / (1280 / 720) */"
  }
}));

export const ResponsivePlayer = ({
  isPlaying,
  setPlaying,
  triggerNextSong,
  currentListing
}) => {
  const classes = useStyles();


  return (
    <div className={classes.playerWrapper}>
      {currentListing ? (
        <ReactPlayer
          className={classes.reactPlayer}
          url={currentListing ? currentListing.url : ""}
          width="100%"
          height="100%"
          playing={isPlaying}
          controls={true}
          onEnded={triggerNextSong}
        />
      ) : (
        <h1>hello</h1>
      )}
    </div>
  );
};

// currentlListing:
// {…}

// isPlaying:
// true
// setPlaying:
// bound dispatchAction()
// triggerNextSong:
// triggerNextSong()

// .player-wrapper {
//   position: relative;
//   padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */
// }

// .react-player {
//   position: absolute;
//   top: 0;
//   left: 0;
// }
