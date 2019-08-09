import React, { Component } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import ButtonAppBar from '../Components/ButtonAppBar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import AppBar from '@material-ui/core/AppBar';


const useStyles = makeStyles(theme => ({

  buttons: {
    backgroundColor: "white"
  },
}));
  


const PlayListIndexHeader = () => {
  const classes = useStyles();
  

    return (
      <div  >
    <CssBaseline />
    <AppBar>
         <ButtonGroup 
         fullWidth 
         aria-label="full width outlined button group"
         className ={classes.buttons}
           >
          <Button>PlayLister</Button>
          <Button>Log Out</Button>
          <Button>Share</Button>
        </ButtonGroup>
        <ButtonAppBar />
        </AppBar>
       
      </div>
    );
  }


export default PlayListIndexHeader;