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
  const genres = ["Blues", "Classical", "Country", "Electronic",
    "Folk", "Jazz", "New age", "Reggae", "Rock", "Metal", "Other"]
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    props.setGenre(event.target.value)
  }

  const returnGenreOption = (genre,i) => {
    return (<option key={i} value={genre}>{genre}</option>)
  }

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl}>

        <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
          Genre
        </InputLabel>

        <Select
          native
          defaultValue={props.selectedPlaylist && props.addOrEdit === "edit" ? props.selectedPlaylist.genre : null}
          onChange={handleChange}
          input={
            <OutlinedInput name="genre" labelWidth={labelWidth} id="outlined-age-native-simple" />
          }
        >

          <option value=""></option>
          {genres.map((genre,i) => returnGenreOption(genre,i))}

        </Select>

      </FormControl>

    </div>
  );
}