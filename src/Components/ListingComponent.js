import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ReactPlayer from 'react-player'
import { ResponsivePlayer } from './ResponsivePlayer';
import CardMedia from '@material-ui/core/CardMedia';
import API from '../API'
import ButtonColumn from './ButtonColumn';
import Fab from '@material-ui/core/Fab';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function ListingComponent(props) {
  const classes = useStyles();
  const MySwal = withReactContent(Swal)
  const { id, suggestion, url, position, playlist_id, name, updated_at } = props.listing
  const { currentlyPlaying, currentUrl, setUrl, setPlaying, playerCount, addPlayer } = props

  const returnButtonColumn = () => {
    return (
      <div>
        <Fab id="up" size="small" color="primary" aria-label="add"
          className={classes.margin}
          onClick={() => handleMove("up")}
        >
          <ArrowUpwardIcon />
        </Fab>

        <Fab id="down" size="small" color="primary" aria-label="add"
          className={classes.margin}
          onClick={() => handleMove("down")}
        >
          <ArrowDownwardIcon />
        </Fab>

      </div>
    )
  }

  const handleMove = (type) => {
    type === "up" ? console.log("moving up...", id) : console.log("moving down...", id)

    let newListing = { ...props.listing }
    API.updateListingsPositions(newListing, type).then(resp => {
      props.updateListings()
      //  if (type === "up" && currentlyPlaying === position){
      //   setPlaying(currentlyPlaying  +1) 
      //  }
      //   else if (type === "down" && currentlyPlaying === position) {
      //    setPlaying(currentlyPlaying  -1) 
      //   } 
    })
  }

  const handleClick = () => {

    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.value) {
        API.updateListingsPositions(props.listing, "delete")
        API.deleteListing(id).then(resp => {
          props.updateListings()
          MySwal.fire(
            'Done!',
            `${resp.message}`,
            'success'
          )
        })

      }
    })


    // API.updateListingsPositions(props.listing, "delete")
    //   API.deleteListing(id).then(resp => {
    //   props.updateListings()
    //     alert(resp.message)    
    //   })
  }


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>

        <Grid container spacing={2}>

          <ReactPlayer
            className={classes.img}
            playing={currentlyPlaying === position ? true : false}
            url={url}
            onPlay={() => {
              setPlaying(position)
              addPlayer(playerCount + 1)
            }
            }
            // onPause={() => addPlayer(playerCount - 1)}
            onEnded={() => setPlaying(position - 1)}
            controls={true}

          />

          <Grid item >
            {/* <ButtonBase className={classes.image}> */}
            {/* <ResponsivePlayer className={classes.img} ></ResponsivePlayer>  */}
            <Grid item xs container direction="row" spacing={2}>
              {returnButtonColumn()}
            </Grid>

            {/* </ButtonBase> */}
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Suggestion?: {suggestion ? "Yes" : "No"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Position Number: {position}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Listing id: {id}
                </Typography>
              </Grid>
              <Grid item>
                <Typography onClick={handleClick} variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{suggestion ? "Suggestion" : ""}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}