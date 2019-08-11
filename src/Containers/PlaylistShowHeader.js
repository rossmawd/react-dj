import React, { Component } from 'react';
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

const PlaylistShowHeader = (props) => {
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
          <Button>PlayLister</Button>

          <Button
            onClick={() => {
              API.logOut(props)
              //props.history.push('/')
            }
            }
          >Log Out
          </Button>

          <Button>Search</Button>
        </ButtonGroup>
        <ButtonAppBar />
      </AppBar>

    </div>
  );
}

export default PlaylistShowHeader;