import React, {useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import Header from '../../baseUI/Header';
import {Container} from './style';
import {CSSTransition} from 'react-transition-group';

interface IAlbumProps extends RouteComponentProps{

}

const Album:React.FunctionComponent<IAlbumProps> = (props) => {
  const [showStatus, setShowStatus] = useState<boolean>(true);

  const handleBack = () => {
    setShowStatus(false)
  };

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
        <Header title={"返回"} handleClick={handleBack}></Header>
      </Container>
    </CSSTransition>
  );
};

export default React.memo(Album);