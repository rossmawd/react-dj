import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactPlayer from "react-player";
import API from "../API.js";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    flexBasis: 200
  },
  button: {
    margin: theme.spacing(1),
    flexBasis: 200
  }
}));

export default function EditListingForm(props) {
  const classes = useStyles();
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const { playlist, playlistLength, setCurrentUserFromToken } = props;
  const MySwal = withReactContent(Swal);

  const handleChange = event => {
    if (event.target.id === "url") {
      setUrl(event.target.value);
    } else if (event.target.id === "song-name") {
      setName(event.target.value);
    }
  };

  const handleSubmit = () => {
    let approvedListing = constructListing();
    if (approvedListing) {
      API.postListing(constructListing()).then(data => {
        console.log("Here is the result of a listing POST: ", data);
        props.toggleShowListingsEdit();
        props.getPlaylist(playlist.id);
        setCurrentUserFromToken();
      });
    }
  };

  const constructListing = () => {
    let suggestion = !props.showAdminControls;
    let duplicate = playlist.listings.filter(listing => listing.url === url)[0];
    let text = ""
    
    if (duplicate) {
      text = "That song is already in the playlist!"
      showSubmitError(duplicate.name, "duplicate", text);
      duplicate = null
      return false;
    }
    if (name === "") {
      text = "A song must have a name!"
      showSubmitError(name, "noName", text)
      return false
    }
    if (url === "") {
      text = "Please provide a URL from YouTube"
      showSubmitError(name, "noUrl", text)
      return false
    }
    if (!ReactPlayer.canPlay(url)){
      text = "Sorry, this doesn't look like a valid URL!"
      showSubmitError(name, "badUrl", text)
      return false
    }
    let newListing = {
      name: name,
      url: url,
      suggestion: suggestion,
      position: playlistLength,
      playlist_id: props.playlist.id
    };
    return newListing;
  };

  const showSubmitError = (data, errorType, text) => {

    MySwal.fire({
      type: "error",
      title: "Oops...",
      text: text,
      footer: errorType === "duplicate" ? `You called it ${data}` : null
    });
  };

  return (
    <div className={classes.root}>
      <br />
      <TextField
        id="url"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="YouTube URL"
        onChange={event => handleChange(event)}
        InputProps={{}}
      />
      <TextField
        id="song-name"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="Track Name"
        onChange={event => handleChange(event)}
        InputProps={{}}
      />
      <Button
        variant="contained"
        className={classes.button}
        onClick={handleSubmit}
      >
        {props.showAdminControls ? "Add To Playlist" : "Add Suggestion"}
      </Button>
    </div>
  );
}
