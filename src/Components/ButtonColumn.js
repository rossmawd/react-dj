import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function ButtonColumn() {
  const classes = useStyles();

  return (
    <div>
     
      <div>
        <Fab size="small" color="primary" aria-label="add" className={classes.margin}>
          <ArrowUpwardIcon />
        </Fab>
        
      </div>
      <div>
        <Fab size="small" color="primary" aria-label="add" className={classes.margin}>
          <ArrowDownwardIcon />
        </Fab>
        
      </div>
    
     
    </div>
  );
}