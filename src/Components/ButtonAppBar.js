
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#BB1918",
    textAlign: "left",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  createButton: {
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const {playlist} = props 

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar >
          
          <Typography variant="h6" className={classes.title}>
            {playlist ? playlist.name : localStorage.email}
          </Typography>

          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="create">
            <SettingsIcon />
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="create"
            onClick={props.toggleShowListingsEdit ? props.toggleShowListingsEdit : () => props.togglePlaylistForm(false)}>
            <CreateIcon/>
          </IconButton>
         
        </Toolbar>
      </AppBar>
    </div>
  );
}