import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ReactPlayer from 'react-player'
import { ResponsivePlayer } from './ResponsivePlayer';
import CardMedia from '@material-ui/core/CardMedia';

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
}));

export default function ListingComponent(props) {
  const classes = useStyles();
  const {suggestion, url, position, playlist_id, name, updated_at} = props.listing

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        
        <Grid container spacing={2}>
          <Grid item >
            {/* <ButtonBase className={classes.image}> */}
            {/* <ResponsivePlayer className={classes.img} ></ResponsivePlayer>  */}
           
            <ReactPlayer className={classes.img} url={url} light />
        
            {/* </ButtonBase> */}
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Suggestion?: {suggestion ? "Yes": "No"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Position in Playlist: {position}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
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