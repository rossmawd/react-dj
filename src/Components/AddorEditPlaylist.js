import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import API from "../API.js";
import DropDownSelect from './DropDownSelect'
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    position: "fixed"
  },
  margin: {
    margin: theme.spacing(1)
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
  const [genre, setGenre] = useState(
    props.selectedPlaylist && props.addOrEdit === "edit" ?
    props.selectedPlaylist.genre : "");
  const [name, setName] = useState(
    props.selectedPlaylist && props.addOrEdit === "edit" ?
    props.selectedPlaylist.name : "");
  const [description, setDescription] = useState(
    props.selectedPlaylist && props.addOrEdit === "edit" ?
    props.selectedPlaylist.description : "");

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
    // POST - Party false
    console.log("lets POST a playlist!")
  };

  const handleEdit = (event) => {
    event.preventDefault()
  
    console.log("let's Edit!!!!")
    
    API.updatePlaylist(constructPlaylist(props.selectedPlaylist.id)).then(data => {
      console.log("Here is the result of a Playlist PATCH: ", data)
      props.togglePlaylistForm()
      props.updatePlaylists()
    })
    // PO
    
  }

  const constructPlaylist = (playlistId = null) => {

    let newPlaylist = {
      "name": name, "description": description, "party": false,
      "genre": genre, user_id: localStorage.currentUser
    }

    if (playlistId) {
        newPlaylist["id"] = playlistId
    }
    return newPlaylist  // token will have to be sent from API method to check if user valid
  };

  return (
    <div className={classes.root}>
      <br />
      <Paper elevation={4} className={classes.paper}>
        <TextField
          id="name"
          value= {name ? name : null} //CONTROLLED
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          label="Playlist Name"
          onChange={event => handleChange(event)}
          InputProps={{}}
        />

        <DropDownSelect selectedPlaylist={props.selectedPlaylist}
          addOrEdit={props.addOrEdit}
          setGenre={setGenre}
          genre={genre}
        />

        <TextField
          id="description"
          value={description ? description : null} //CONTROLLED
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
          onClick={props.addOrEdit === "edit" ? handleEdit : handleSubmit}
        >
          {props.addOrEdit} Playlist
      </Button>
      </Paper>
    </div>
  );
}
