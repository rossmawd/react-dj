import React, { Component } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import ButtonAppBar from "../Components/ButtonAppBar";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import API from "../API";

const useStyles = makeStyles(theme => ({
  buttons: {
    backgroundColor: "white"
  }
}));

const PlaylistShowHeader = (props) => {
  const classes = useStyles();
  const { playlist, currentUser } = props;
  const MySwal = withReactContent(Swal);

  const copiedToClipboard = () => {
    props ? console.log(props) : console.log("nay")
    MySwal.fire({
      title: 'URL Copied to Clipboard!',
      animation: false,
      customClass: {
        popup: 'animated tada'
      }
    })
    

  };

  return (
    <div>
      <CssBaseline />
      <AppBar>
        <ButtonGroup
          fullWidth
          aria-label="full width outlined button group"
          className={classes.buttons}
        >
          <Button as={Link}>
            <Link to={"/playlists"}>React-DJ</Link>
          </Button>

          <Button
            onClick={() => {
              API.logOut(props);
            }}
          >
            {props.currentUser ? "Log Out" : "Guest View"}
          </Button>

          <CopyToClipboard
            text={"localhost:3001" + props.location.pathname}
            onCopy={() => copiedToClipboard()} >
            <Button>Share</Button>
          </CopyToClipboard>

        </ButtonGroup>

        <ButtonAppBar
          playlist={playlist}
          toggleShowListingsEdit={props.toggleShowListingsEdit}
        />

      </AppBar>
    </div>
  );
};

export default PlaylistShowHeader;
