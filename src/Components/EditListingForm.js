import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
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
  const {playlistLength, setCurrentUserFromToken} = props

  const handleChange = event => {
    if (event.target.id === "url") {
      setUrl(event.target.value);
    } else if (event.target.id === "song-name") {
      setName(event.target.value);
    }
  };

  const handleSubmit = () => {
    API.postListing(constructListing()).then(data => {
      console.log("Here is the result of a listing POST: ", data)
      props.toggleShowListingsEdit()
      
      setCurrentUserFromToken()   
    })
  };

  const constructListing = () => {
    let newListing = { "name": name, "url": url, "suggestion": false, "position": playlistLength, "playlist_id": props.playlist.id }
    return newListing
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
        Add To Playlist
      </Button>
    </div>
  );
}
