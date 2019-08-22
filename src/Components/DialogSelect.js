import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DialogSelect(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    genre: '',
  });
  const names = ["All", "New age", "Jazz", "Metal", "Country", "Folk", "Other", "Blues", "Classical", "Electronic", "Rock"] 

  // const handleChange = name => event => {
  //   setState({ ...state, [name]: Number(event.target.value) });
  // };
const handleChange = (event) => {
  setState({genre: event.target.value})
}

  function handleClickOpen() {
    setState({ ...state, open: true });
  }

  const handleChangeFilter = () => {
     //debugger
     props.setPlaylistFilter(state.genre)
     props.toggleFilterForm()
  }

  function handleClose() {
    setState({ ...state, open: false });
  }

  return (
    <div>
      <Dialog disableBackdropClick disableEscapeKeyDown open={props.showFilterForm} onClose={handleClose}>
        <DialogTitle>Pick A Genre:</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
           
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="genre-simple">genre</InputLabel>
              <Select
              native
                value={state.genre}
                onChange={handleChange}
                input={<Input id="genre-simple" />}
              >
        
                {names.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
              </Select>

            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.toggleFilterForm} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            handleChangeFilter()
          }} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}