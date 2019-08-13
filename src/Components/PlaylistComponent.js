import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Lightning from '@material-ui/icons/OfflineBolt';
import Delete from '@material-ui/icons/Delete';
import Link from '@material-ui/core/Link';
import API from '../API'

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(0.4)}px auto`, //space between divs
    padding: theme.spacing(2), //space between components in div
    backgroundColor: "grey"
  },
}));

// const goToPlaylist = (e, playlist) => {
//   e.preventDefault()
//   debugger
//   if (playlist){
//     console.log(playlist.name)
//   }

// }


export default function PlaylistComponent(props) {
  const classes = useStyles();

  const handleDelete = () => {
    API.deletePlaylist(props.playlist.id).then(data => {
      props.updatePlaylists()
    })
  }
  
  return (
   
      <Paper 
      className={classes.paper}
      >
        <Grid container wrap="nowrap" spacing={2}>

          <Grid item>
          <Lightning/>  
          </Grid>
         
         
          {/* ZERO MIN WIDTH */}
         
          <Grid item xs zeroMinWidth>
          <Link  href={`/playlist/${props.playlist.id}`}>
            <Typography noWrap>{props.playlist.name}</Typography>
            </Link>
          </Grid>
       
          <Grid item>
          <Delete onClick={handleDelete}/>  
          </Grid>
          
        </Grid>
        <Grid item xs zeroMinWidth>
            <Typography noWrap>User: {props.playlist.user_id}</Typography>
          </Grid>
        
      </Paper>
     
  );
}

// {<Paper className={classes.paper}>
// <Grid container wrap="nowrap" spacing={2}>
//   <Grid item>
//     <Avatar>W</Avatar>
//   </Grid>
//   <Grid item xs>
//     <Typography noWrap>{message}</Typography>
//   </Grid>
// </Grid>
// </Paper>

// <Paper className={classes.paper}>
// <Grid container wrap="nowrap" spacing={2}>
//   <Grid item>
//     <Avatar>W</Avatar>
//   </Grid>
//   <Grid item xs>
//     {/* THIS GUY WRAPS */}
//     <Typography>{message}</Typography> 
//   </Grid>
// </Grid>
// </Paper>}