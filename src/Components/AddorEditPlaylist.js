import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import API from "../API.js";
import DropDownSelect from './DropDownSelect'

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
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function AddorEditPlaylist(props) {
  const classes = useStyles();
  const [genre, setGenre] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //const {playlistLength, updateListings} = props

  const handleChange = event => {
    if (event.target.id === "name") {
      setName(event.target.value);
    } else if (event.target.id === "description") {
      setDescription(event.target.value);
    }
  };

  const handleSubmit = () => {
    API.postPlaylist(constructPlaylist()).then(data => { 
      console.log("Here is the result of a Playlist POST: ", data)
      props.togglePlaylistForm()
      props.updatePlaylists()
    })
    // POST - Party flase
    console.log("lets POST a playlist!")
  };

  const constructPlaylist = () => {
    let newPlaylist = {"name": name, "description": description, "party":false,
     "genre": genre, user_id: localStorage.currentUser} 
    
    return newPlaylist  // token will have to be sent from API method to check if user valid
  };

  return (
    <div className={classes.root}>
      <br />
      <TextField
        id="name"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="Playlist Name"
        onChange={event => handleChange(event)}
        InputProps={{}}
      />

<DropDownSelect setGenre={setGenre} genre={genre} />

<TextField
        id="description"
        label="Description"
        multiline
        rows="4"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={event => handleChange(event)}
      />
      
      <Button
        variant="contained"
        className={classes.button}
        onClick={handleSubmit}
      >
        Create Playlist
      </Button>
    </div>
  );
}
