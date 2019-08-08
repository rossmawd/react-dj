import React, { Component } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import ButtonAppBar from '../Components/ButtonAppBar';

class PlayListIndexHeader extends Component {
  render() {
    return (
      <div>
        <h1>A little test HELLO</h1>
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