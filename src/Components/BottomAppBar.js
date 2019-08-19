import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
//import Paper from "@material-ui/core/Paper";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdSkipNext } from "react-icons/md";
import MoreIcon from "@material-ui/icons/MoreVert";
//import ReactPlayer from "react-player";
import { ResponsivePlayer } from "./ResponsivePlayer";

const useStyles = makeStyles(theme => ({
  paper: {
    paddingBottom: 50
  },
  appBar: {
    top: "auto",
    height: "20%",
    bottom: 0
  },
  img: {
    height: "10%"
  },
  grow: {
    flexGrow: 1
  },
}));

export default function BottomAppBar(props) {
  const classes = useStyles();

  const playOrPause = () => {
    if (!props.isPlaying) {
      return (
        <FaPlay
          onClick={() => {
            props.setPlaying(!props.isPlaying);
          }}
        />
      );
    } else {
      return (
        <FaPause
          onClick={() => {
            props.setPlaying(!props.isPlaying);
          }}
        />
      );
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            {playOrPause()}
          </IconButton>

          {/* <ReactPlayer
            className={classes.img}
            // playing={currentlyPlaying === position ? true : false}
            url={"https://www.youtube.com/watch?v=_X_1o3Qw4KM"}
            light
            // onPlay={() => {
            //   setPlaying(position)
            //   addPlayer(playerCount + 1)
            // }
            // }
            // onPause={() => addPlayer(playerCount - 1)}
            // onEnded={() => setPlaying(position - 1)}
            controls={true}
          /> */}
          <ResponsivePlayer
            setPlaying={props.setPlaying}
            currentListing={props.currentListing}
            triggerNextSong={props.triggerNextSong}
            isPlaying={props.isPlaying}
          />
         
          {/* <div className={classes.grow} />  */} 
          {/* moves controls over to RHS */}

          <IconButton color="inherit">
            <MdSkipNext
              onClick={() => props.triggerNextSong(props.currentListing.id)}
            />
          </IconButton>

          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
