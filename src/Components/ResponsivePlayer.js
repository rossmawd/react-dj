import ReactPlayer from "react-player";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  playerWrapper: {
    paddingTop: "5%",
    paddingBottom: "3%",
    position: "inherit"
  }
}));

export const ResponsivePlayer = ({
  isPlaying,
  setPlaying,
  triggerNextSong,
  currentListing,
}) => {
  const classes = useStyles();

  React.useEffect(() => {
    setPlaying(false)
  }, []);

  return (
    <div className={classes.playerWrapper}>
      {currentListing ? (
        <ReactPlayer
          className={classes.reactPlayer}
          url={currentListing ? currentListing.url : ""}
          width="100%"
          height="100%"
          volume="1"
          playing={isPlaying}
          onPlay={setPlaying(true)}
          controls={true}
          onEnded={triggerNextSong}
        />
      ) : (
          <h1>hello</h1>
        )}
    </div>
  );
};


