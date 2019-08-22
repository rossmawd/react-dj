import React from "react";
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
import Chip from '@material-ui/core/Chip';
import API from "../API";

const useStyles = makeStyles(theme => ({
  buttons: {
    backgroundColor: "white"
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

const PlaylistShowHeader = (props) => {
  const classes = useStyles();
  const { playlist, currentUser } = props;
  const MySwal = withReactContent(Swal);
  const [ace, setBackgroundColor] = React.useState("inherit");
  const [spanHide, setHide] = React.useState(false);
  const updateTimer = React.useRef(null);
  const updateTimerTwo = React.useRef(null);

  function setSpanColor() {
    setBackgroundColor("#9b34ee");
	updateTimer.current = setTimeout(() => {
	  setBackgroundColor("inherit");
	  updateTimer.current = null;
	}, 1000);
  }
  function setHideSpan() {
    setHide(false)
	updateTimerTwo.current = setTimeout(() => {
	  setHide(true)
	  updateTimerTwo.current = null;
	}, 5000);
  }

  React.useEffect(() => {
    if(!updateTimer.current) {
      setSpanColor();
      setHideSpan()
    }
  }, [props.text]);

  React.useEffect(()=> {
    return () => {
      if (updateTimer.current) {
        clearTimeout(updateTimer.current);
    }
      if (updateTimerTwo.current) {
        clearTimeout(updateTimerTwo.current);
    }

    };
  }, []);

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
            <Link to={props.currentUser ? "/playlists": "/signup"}>React-DJ</Link>
          </Button>

          <Button
            onClick={() => {
              API.logOut(props);
            }}
          >
            {currentUser ? "Log Out" : "Guest View"}
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
          actionCableText={props.text}
          changeText={props.changeText}
          showAdminControls={currentUser && currentUser.id === playlist.user_id}
          
        />
         {/* <Chip label={props.text} className={classes.chip} /> */}
         <span hidden={spanHide} className="label-text" style={{ backgroundColor: ace }}>
	  {props.text}
	</span>
      </AppBar>
    </div>
  );
};

export default PlaylistShowHeader;
