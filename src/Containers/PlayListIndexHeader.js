import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import ButtonAppBar from '../Components/ButtonAppBar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import API from '../API'

const useStyles = makeStyles(theme => ({
  buttons: {
    backgroundColor: "white"
  },
  highlightedButton: {
    backgroundColour:"lightBlue"
  }
}));

const PlayListIndexHeader = (props) => {
  const classes = useStyles();

  return (
    <div  >
      <CssBaseline />

        <AppBar>
          <ButtonGroup
            fullWidth
            aria-label="full width outlined button group"
            className={classes.buttons}
          >
            <Button>React-DJ</Button>

            <Button
              onClick={() => {
                API.logOut(props)
                //props.history.push('/')
              }
              }
            >Log Out
            </Button>

            <Button 
            onClick={
              () => {
                props.playlistFilter === "All" && props.toggleFilterForm()
                props.playlistFilter !== "All" && props.setPlaylistFilter("All")
              }}
            //className={props.playlistFilter !== "All" ? classes.buttons : null}
            >{props.playlistFilter !== "All" ? "Filter On" : "Filter"}
            
            </Button>
          </ButtonGroup>

          <ButtonAppBar 
          togglePlaylistForm={props.togglePlaylistForm}
          />

      </AppBar>

    </div>
  );
}

export default PlayListIndexHeader;