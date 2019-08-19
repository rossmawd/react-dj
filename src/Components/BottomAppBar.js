import React from "react";

import { withStyles } from "@material-ui/core/styles";
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

// const useStyles = makeStyles(theme => ({
const styles = {
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
  }
};
// }));

// function useTraceUpdate(props) {
//   const prev = useRef(props);
//   useEffect(() => {
//     const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
//       if (prev.current[k] !== v) {
//         ps[k] = [prev.current[k], v];
//       }
//       return ps;
//     }, {});
//     if (Object.keys(changedProps).length > 0) {
//       console.log('Changed props:', changedProps);
//     }
//     prev.current = props;
//   });
// }

class BottomAppBar extends React.Component {
  //const classes = useStyles();
  //debugger
  // useTraceUpdate(props)

  // shouldComponentUpdate(nextProps, nextState) {  // should always return a boolean
  //   //Only update if the props you care about change.
  //   //keep in mind that it can cause major problems if you set it and forget it,
  //   console.log("checking")
  //   debugger
  //   return ((this.props.isPlaying !== nextProps.isPlaying))
    
  // }

  render() {
    const { classes } = this.props;

    const playOrPause = () => {
      if (!this.props.isPlaying) {
        return (
          <FaPlay
            onClick={() => {
              this.props.setPlaying(!this.props.isPlaying);
            }}
          />
        );
      } else {
        return (
          <FaPause
            onClick={() => {
              this.props.setPlaying(!this.props.isPlaying);
            }}
          />
        );
      }
    };

    return (
      <React.Fragment>
        {console.log("the bottom app bar has rendered")}
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
              setPlaying={this.props.setPlaying}
              currentListing={this.props.currentListing}
              triggerNextSong={this.props.triggerNextSong}
              isPlaying={this.props.isPlaying}
            />

            {/* <div className={classes.grow} />  */}
            {/* moves controls over to RHS */}

            <IconButton
              onClick={() =>
                this.props.triggerNextSong(this.props.currentListing.id)
              }
              color="inherit"
            >
              <MdSkipNext />
            </IconButton>

            <IconButton edge="end" color="inherit">
              <MoreIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(BottomAppBar);
