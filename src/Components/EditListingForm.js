import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    flexBasis: 200,
  },
}));

export default function EditListingForm() {
  const classes = useStyles();
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");


const handleChange = (event) => {
  if (event.target.id === "url") {
 
  setUrl(event.target.value)
}
else if (event.target.id === "song-name") {
  setName(event.target.value)
}
}

  return (
    <div className={classes.root}>
      <br></br>
      <TextField
        id="url"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="YouTube URL"
        onChange={(event) => handleChange(event)}
        InputProps={{
          
        }}
      />
      <TextField
        id="song-name"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="Track Name"
        onChange={(event) => handleChange(event)}
        InputProps={{
          
        }}
      />
      {/* <TextField
        select
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="Your Songs"
        value={values.weightRange}
        onChange={handleChange('weightRange')}
        InputProps={{
          startAdornment: <InputAdornment position="start">Select</InputAdornment>,
        }}
      >
        {ranges.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField> */}
    
    </div>
  );
}