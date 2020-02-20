import React, {useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Container} from './style';
import {CSSTransition} from 'react-transition-group';

interface IAlbumProps extends RouteComponentProps{

}

const Album:React.FunctionComponent<IAlbumProps> = (props) => {
  const [showStatus, setShowStatus] = useState<boolean>(true);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
        hahahah
      </Container>
    </CSSTransition>
  );
};

export default React.memo(Album);