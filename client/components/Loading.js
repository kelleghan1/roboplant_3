import React from 'react';
import ReactDom from 'react-dom';
import Popup from 'react-popup';

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="loading">
        <div id="loading-wrap">
          <img src="assets/images/loading.gif" alt="" />
          <p>LOADING</p>
        </div>
      </div>
    )
  }

};

export default Loading;
