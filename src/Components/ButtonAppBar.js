import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "#BB1918",
    textAlign: "left"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  createButton: {}
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const { playlist } = props;
  const MySwal = withReactContent(Swal);
 
  const showPlaylistDescription = () => {
    MySwal.fire({
      type: 'info',
      title: `"${playlist.name}"`,
      text: `${playlist.description}`,
      html:
      `<b>Desciption:</b> <br></br> ` +
      `${playlist.description}`,
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography 
          variant="h6" 
          className={classes.title}
          onClick={playlist ? showPlaylistDescription : null}
          >
            {playlist ? playlist.name : localStorage.email}
          </Typography>

          {props.showAdminControls || !props.toggleShowListingsEdit ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="create"
              onClick={
                props.toggleShowListingsEdit
                  ? props.toggleShowListingsEdit
                  : () => props.togglePlaylistForm(false)
              }
            >
              <CreateIcon />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
