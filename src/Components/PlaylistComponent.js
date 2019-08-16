import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Lightning from "@material-ui/icons/OfflineBolt";
import Delete from "@material-ui/icons/Delete";
import {Link} from 'react-router-dom'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CreateIcon from '@material-ui/icons/Create';
import API from "../API";

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(0.4)}px auto`, //space between divs
    padding: theme.spacing(2), //space between components in div
    backgroundColor: "white"

  },
  title: {
    fontSize: 20,
  },
}));

export default function PlaylistComponent(props) {
  const classes = useStyles();
  const MySwal = withReactContent(Swal);

  const handleDelete = () => {
    MySwal.fire({
      title: `Delete "${props.playlist.name}"?`,
      text: "You can't undo this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#800080",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        API.deletePlaylist(props.playlist.id).then(data => {
          props.updatePlaylists();
        });
        MySwal.fire(
          "Deleted!",
          `"${props.playlist.name}" has been deleted.`,
          "success"
        );
      }
    });
  };

  const handleClick = () => {
    props.setSelectedPlaylist(props.playlist)
    console.log("time to edit")
    props.togglePlaylistForm(true)
  };

  return (
    <Paper className={classes.paper}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <CreateIcon onClick={handleClick} />
        </Grid>

        {/* ZERO MIN WIDTH */}

        <Grid item xs zeroMinWidth>

          <Typography variant={"overline"} className={classes.title} noWrap>
            <Link to={`/playlist/${props.playlist.id}`}>
              {props.playlist.name}
            </Link>
          </Typography>

        </Grid>

        <Grid item>
          <Delete onClick={handleDelete} />
        </Grid>
      </Grid>
      <Grid item xs zeroMinWidth>
        <Typography noWrap>User: {props.playlist.user_id}</Typography>
      </Grid>
      <Grid item>
        <Lightning onClick={handleClick} />
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
