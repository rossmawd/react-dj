import React, { Component } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import ButtonAppBar from '../Components/ButtonAppBar';


class PlayListIndexHeader extends Component {
  render() {
    return (
      <div>
    
         <ButtonGroup fullWidth aria-label="full width outlined button group">
          <Button>PlayLister</Button>
          <Button>Log Out</Button>
          <Button>Share</Button>
        </ButtonGroup>
        <ButtonAppBar />
      </div>
    );
  }
}

export default PlayListIndexHeader;