import React from 'react';
import {Container} from './style';

const Album = () => {
  console.log('run');
  return (
    <Container>
    </Container>
  )
};

export default React.memo(Album)