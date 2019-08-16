import React, { Component } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import ButtonAppBar from '../Components/ButtonAppBar';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
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
  const {playlist} = props
 

  return (
    <div  >
      <CssBaseline />
      <AppBar>
        <ButtonGroup
          fullWidth
          aria-label="full width outlined button group"
          className={classes.buttons}
        >
           
       
          <Button as={Link} >
          <Link to={"/playlists"}>
            React-DJ
            </Link>
            </Button>
        

          <Button
            onClick={() => {
              API.logOut(props)
              //props.history.push('/')
            }
            }
          >Log Out
          </Button>

          <Button>Share</Button>
        </ButtonGroup>
        <ButtonAppBar
          playlist = {playlist}
          toggleShowListingsEdit={props.toggleShowListingsEdit}
        />
      </AppBar>

    </div>
  );
}

export default PlaylistShowHeader;