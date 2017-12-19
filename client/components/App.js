import React from 'react';
import Routes from '../routes';
import Home from './Home';
import { Link } from 'react-router-dom';
import Popup from 'react-popup';


class App extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>

        <Routes />
        <Popup closeOnOutsideClick={true}/>

      </div>
    )
  }
}

export default App;
