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

            <Button>Filter</Button>
          </ButtonGroup>

          <ButtonAppBar 
          togglePlaylistForm={props.togglePlaylistForm}
          />

      </AppBar>

    </div>
  );
}

export default PlayListIndexHeader;