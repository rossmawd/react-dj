
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import Snackbar from '@material-ui/core/Snackbar';


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
  },
  
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const {playlist} = props 
  // const [state, setState] = React.useState({
  //   open: true,
  //   vertical: 'middle',
  //   horizontal: 'center',
  // });

  // const { vertical, horizontal, open } = state;

  // const handleClick = newState => () => {
  //   setState({ open: true, ...newState });
  // };

  // function handleClose() {
  //   setState({ ...state, open: false });
  // }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar >
          
          <Typography variant="h6" className={classes.title}>
            {playlist ? playlist.name : localStorage.email}
          </Typography>

          {/* <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{props.actionCableText}</span>}
      /> */}

          <IconButton edge="start" color="inherit" aria-label="create"
            onClick={props.toggleShowListingsEdit ? props.toggleShowListingsEdit : () => props.togglePlaylistForm(false)}>
            <CreateIcon/>
          </IconButton>
         
        </Toolbar>
      </AppBar>
    </div>
  );
}