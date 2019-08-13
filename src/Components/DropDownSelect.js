import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DropDownSelect(props) {
  const classes = useStyles();
  
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {  
    props.setGenre(event.target.value)  
  }

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
          Genre
        </InputLabel>
        <Select
          native
          value={props.genre}
          onChange={handleChange}
          input={
            <OutlinedInput name="genre" labelWidth={labelWidth} id="outlined-age-native-simple" />
          }
        >
          <option value="" />
          <optgroup label="Rock">
          <option value={"Speed Metal"}>Speed Metal</option>
          </optgroup>
          <option value={"Blues"}>Blues</option>
         
          <option value={"Jazz"}>Jazz</option>
        </Select>
      </FormControl>
   
    </div>
  );
}