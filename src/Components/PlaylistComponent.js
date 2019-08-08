import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
//import Icon from '@material-ui/core/Icon';
import Star from '@material-ui/icons/Star';
import Lightning from '@material-ui/icons/OfflineBolt';


const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(0.4)}px auto`, //space between divs
    padding: theme.spacing(2), //space between components in div
    backgroundColor: "grey"
  },
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

export default function PlaylistComponent(props) {
  const classes = useStyles();

  return (
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
          <Lightning/>
          </Grid>
          {/* ZERO MIN WIDTH */}
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{props.playlist.name}</Typography>
          </Grid>
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