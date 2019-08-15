

import ReactPlayer from 'react-player'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  playerWrapper: {
  //  position: "relative",
  //  paddingTop: "56.25% /* Player ratio: 100 / (1280 / 720) */"
  },
 
}));


export const ResponsivePlayer = () => {

  const classes = useStyles();

    return (
      <div className={classes.playerWrapper}>
        <ReactPlayer
          className={classes.reactPlayer}
          url='https://www.youtube.com/watch?v=_X_1o3Qw4KM'
          width='100%'
          height='100%'
        />
      </div>
    )
  }



// .player-wrapper {
//   position: relative;
//   padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */
// }
 
// .react-player {
//   position: absolute;
//   top: 0;
//   left: 0;
// }