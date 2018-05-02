import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Popup from 'react-popup';
import Loading from './Loading';
import openSocket from 'socket.io-client';
import Moment from 'moment';

class ModuleSpreadsheets extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      moduleId: this.props.match.params.moduleId,
    }
    this.clientName = this.props.match.params.clientName;
    this.moduleName = this.props.match.params.moduleName;
    this.moduleId = this.props.match.params.moduleId;
  }

  componentDidMount() {
    axios.get('/get_module/' + this.state.moduleId)
      .then(res => {
        console.log('RES', res)
      })
  }

  handleReturnClick () {
    this.props.history.push('/module/charts/' + this.clientName + '/' + this.moduleName + '/' + this.moduleId);
  }

  render() {
    return (
      <div>
        <Header />
        <section>
          <div className="container" id="module_info">
            <div className="client-header">
              <div onClick={this.handleReturnClick} id="return-button">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                Return To Chart
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container" id="module_info">
            <div className="client-header">
              <p><i className="fa fa-leaf" aria-hidden="true"></i> Module: {this.clientName}</p>
            </div>
          </div>
        </section>

        <section>
          <div className="container" id="module_info">
            <div className="client-header">
              <p><i className="fa fa-leaf" aria-hidden="true"></i> Module: {this.moduleName}</p>
            </div>
          </div>
        </section>

        <section>
          <div className="container" id="module_info">
            <div className="client-header">
              <p><i className="fa fa-leaf" aria-hidden="true"></i> Module: {this.moduleName}</p>
            </div>
          </div>
        </section>


        <section>
          <div className="container">

            <div className="content-wrap" id="tempReadings">
              <div className="section-header">
                <p>Temperature Readings</p>
              </div>
              {/* <MySpreadsheet data={this.state.tempData} labels={this.state.tempLabels} chartType={'Temp'} /> */}
            </div>

            <div className="content-wrap" id="humReadings">
              <div className="section-header">
                <p>Humidity Readings</p>
              </div>
              {/* <MySpreadsheet data={this.state.humData} labels={this.state.humLabels} chartType={'Humidity'} /> */}
            </div>

            <div className="content-wrap" id="weightReadings">
              <div className="section-header">
                <p>Weight Readings</p>
              </div>
              {/* <MySpreadsheet data={this.state.weightData} labels={this.state.weightLabels} chartType={'Weight'} /> */}
            </div>

          </div>
        </section>

      </div>
    )
  }
}

export default ModuleSpreadsheets;
