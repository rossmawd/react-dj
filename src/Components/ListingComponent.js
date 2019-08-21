import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
//import ButtonBase from '@material-ui/core/ButtonBase';
//import ReactPlayer from 'react-player'
import API from "../API";
import Fab from "@material-ui/core/Fab";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { MdThumbUp } from "react-icons/md";
import { MdThumbDown } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
//import Divider from '@material-ui/core/Divider';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
//import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  // paper: {
  //   padding: theme.spacing(2),
  //   margin: 'auto',
  //   maxWidth: 500,
  // },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  margin: {
    margin: theme.spacing(1),
    float: "left"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  card: {
    "&:hover": {
      background: "#C0C0C0"
    },
    padding: "5px",
    border: "2px solid black"
  },
  like: {
    background: "black"
  }
}));

export default function ListingComponent(props) {
  const classes = useStyles();
  const MySwal = withReactContent(Swal);
  const { id, likes, dislikes, position, suggestion, playlist_id, name } = props.listing;
  //const { suggestion, url, updated_at } = props.listing
  const {
    currentUser,
    currentListing,
    setCurrentListing,
    nextListing,
    setNextListing,
    setPlaying,
    isPlaying,
    showAdminControls
  } = props;

  const returnUpDownButtons = () => {
    return (
      <div className={classes.margin}>
        <Fab
          id="up"
          size="small"
          color="primary"
          aria-label="add"
          // className={classes.margin}
          onClick={() => handleMove("up")}
        >
          <ArrowUpwardIcon />
        </Fab>

        <Fab
          id="down"
          size="small"
          color="primary"
          aria-label="add"
          // className={classes.margin}
          onClick={() => handleMove("down")}
        >
          <ArrowDownwardIcon />
        </Fab>
      </div>
    );
  };

  const handleMove = type => {
    type === "up"
      ? console.log("moving up...", id)
      : console.log("moving down...", id);
    let newListing = { ...props.listing };
    API.updateListingsPositions(newListing, type).then(playlist => {
      props.updatePlaylist(playlist); // Updates user playlists and Listings
    });
  };

 

  const returnLikeDislikeButtons = () => {

     const setButtonStyle = () => {
    let key = JSON.stringify(id) + "like"
    const style = {
      background: "black"
    }
    return localStorage.getItem(key) ? style : null
  }
  const setButtonStyle2 = () => {
    let key = JSON.stringify(id) + "dislike"
    const style = {
      background: "black"
    }
    return localStorage.getItem(key) ? style : null
  }

    return (
      <div className={classes.margin}>
        <Fab
          style={setButtonStyle()}
          id="up"
          size="small"
          color="primary"
          aria-label="add"
          // className={classes.margin}
          onClick={event => {
            handleLikeDislike("like")
            //setButtonStyle("like")
          }}

        >
          <MdThumbUp />
        </Fab>

        <Fab
        style={setButtonStyle2()}
          id="down"
          size="small"
          color="primary"
          aria-label="add"
          // className={classes.margin}
          onClick={() => handleLikeDislike("dislike")}
        >
          <MdThumbDown />
        </Fab>
      </div>
    );
  };

  const handleLikeDislike = type => {

    setLocalStorageForLikesDislikes(type);
    if (currentUser) {
      console.log(type + "d as logged in User: ", currentUser.email)
    }
  };

  const setLocalStorageForLikesDislikes = (type) => {
    let key = JSON.stringify(id) + type;
    let id_s = JSON.stringify(id);
    if (localStorage.getItem(key)) alert("You can only " + type + " a song once!");
    else if (type === "like") {
      console.log("liked!")
      localStorage.removeItem(id_s + "dislike");
      localStorage.setItem(id_s + "like", "true");
      postLikeDislike(type)
    } else if (type === "dislike") {
      console.log("disliked!")
      localStorage.removeItem(id_s + "like");
      localStorage.setItem(id_s + "dislike", "true");
      postLikeDislike(type)
    }
  };

  const postLikeDislike = type => {
    // if (!currentUser && type === "like") {
    let user_id = !currentUser ? 1 : currentUser.id

    if (type === "like") {
      API.postLike({ listing_id: id, user_id: user_id }).then(resp => {
        props.getPlaylist(playlist_id);
      });
    } else if (type === "dislike") {
      API.postDislike({ listing_id: id, user_id: user_id });
      props.getPlaylist(playlist_id);
    }
  };

  const handleDelete = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        API.updateListingsPositions(props.listing, "delete");
        API.deleteListing(id).then(resp => {
          props.setCurrentUserFromToken();
          MySwal.fire("Done!", `${resp.message}`, "success");
        });
      }
    });
  };

  const handlePlay = () => {
    console.log(currentListing.likes);
    console.log(
      "Play triggered by clicking on Title; currentListing is now:",
      props.listing
    );
    setCurrentListing(props.listing);
    setPlaying(true);
  };

  const setCardStyle = () => {
    const style = {
      background: "lightBlue"
    };
    return isPlaying && currentListing.id === id ? style : null;
  };



  return (
    <div className={classes.root}>
      <Card className={classes.card} style={setCardStyle()}>
        <CardContent>
          {showAdminControls
            ? returnUpDownButtons()
            : returnLikeDislikeButtons()}

          <Typography
            onClick={handlePlay}
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {name}
          </Typography>
          <Typography variant="h5" component="h2">
        Suggestion?: {suggestion ? "Yes" : "No"}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        Position Number: {position}
        </Typography>
          <Typography variant="body2" component="p">
            Listing id: {id}
            <br />
            Position: {position}
          </Typography>
          <Typography variant="body2" component="p">
            Likes: {likes.length}
            <br />
            Dislikes: {dislikes.length}
          </Typography>
        </CardContent>
        {showAdminControls ? (
          <CardActions>
            <Button size="small" onClick={handleDelete}>
              DELETE
            </Button>
          </CardActions>
        ) : null}
      </Card>

      {/* <ReactPlayer
            className={classes.img}
            playing={currentlyPlaying === position ? true : false}
            // playing ={false}
            url={url}
          
            wrapper={classes.paper}   //Hmmmm
            onPlay={() => {
              setPlaying(position)
              addPlayer(playerCount + 1)
            }
            }
            // onClick={setPlaying(-1)}
            
            onEnded={() => setPlaying(position - 1)}
            controls={true}

          /> */}
    </div>
  );
}
