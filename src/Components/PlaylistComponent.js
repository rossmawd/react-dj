import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//import Lightning from "@material-ui/icons/OfflineBolt";
import Delete from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CreateIcon from "@material-ui/icons/Create";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { FaSkull as Metal } from "react-icons/fa";
import { FaSadCry as Blues } from "react-icons/fa";
import { FaGuitar as Classical } from "react-icons/fa";
import { FaTruckMonster as Country } from "react-icons/fa";
import { FaWaveSquare as Electronic } from "react-icons/fa";
import { FaPiedPiperAlt as Folk } from "react-icons/fa";
import { FaJoint as Jazz } from "react-icons/fa";
import { FaSpa as NewAge } from "react-icons/fa";
import { FaPeace as Reggae } from "react-icons/fa";
import { FaFireAlt as Rock } from "react-icons/fa";
import { FaBeer } from "react-icons/fa";
import API from "../API";

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(0.4)}px auto`, //space between divs
    padding: theme.spacing(2), //space between components in div
    backgroundImage: "linear-gradient(#808080,#3B3A35)"
  },
  title: {
    fontSize: 20,
    color: "black"
  },
  icon: {
    color: "white",
  },
  faIcon: {
    color: "white",
    zoom: "1.3"
  }
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
    props.setSelectedPlaylist(props.playlist);
    console.log("time to edit");
    props.togglePlaylistForm(true);
  };

  const renderGenreIcon = genre => {
    switch (genre) {
      case "Blues":
        return <Blues />;
      case "Classical":
        return <Classical />;
      case "Metal":
        return <Metal />;
      case "Country":
        return <Country />;
      case "Electronic":
        return <Electronic />;
      case "Folk":
        return <Folk />;
      case "Jazz":
        return <Jazz />;
      case "New age":
        return <NewAge />;
      case "Reggae":
        return <Reggae />;
      case "Rock":
        return <Rock />;
      default:
        return <FaBeer />;
    }
  };

  return (
    <Paper className={classes.paper}>
      <Grid container wrap="nowrap" spacing={2}>

        <Tooltip title="Edit" TransitionComponent={Zoom}>
          <Grid item>
            <CreateIcon className={classes.icon} onClick={handleClick} />
          </Grid>
        </Tooltip>

        <Grid item xs zeroMinWidth>
          <Typography variant={"button"} className={classes.title} noWrap>
            <Link to={`/playlist/${props.playlist.id}`}>
              {props.playlist.name}
            </Link>
          </Typography>
        </Grid>

        <Tooltip title="Delete" TransitionComponent={Zoom}>
          <Grid item>
            <Delete className={classes.icon} onClick={handleDelete} />
          </Grid>
        </Tooltip>

      </Grid>

      <Grid container wrap="nowrap" spacing={3}>

      <Tooltip title={props.playlist.genre} TransitionComponent={Zoom}>
          <Grid item className={classes.faIcon} >
            {/* <FontAwesomeIcon icon="blind" />  */}
            {renderGenreIcon(props.playlist.genre)}
          </Grid>
      </Tooltip>
      
        <Grid item xs zeroMinWidth>
          <Typography variant={"caption"} noWrap>User: {props.playlist.user_id}</Typography>
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
