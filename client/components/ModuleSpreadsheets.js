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
        let compReadings = [];

        for (let i = 0; i < res.data.temperatureReadings.length; i++) {

          let readingObj = {};

          readingObj.time = Moment(res.data.temperatureReadings[i].time).format('MM/DD, h:mm');
          readingObj.temp = res.data.temperatureReadings[i].temperature_reading;

          for (let ii = 0; ii < res.data.humidityReadings.length; ii++) {
            if ( Moment(res.data.humidityReadings[ii].time).format('MM/DD, h:mm') == Moment(res.data.temperatureReadings[i].time).format('MM/DD, h:mm') ) {
              readingObj.hum = res.data.humidityReadings[ii].humidity_reading;
            }
          }

          for (let iii = 0; iii < res.data.weightReadings.length; iii++) {
            if ( Moment(res.data.weightReadings[iii].time).format('MM/DD, h:mm') == Moment(res.data.temperatureReadings[i].time).format('MM/DD, h:mm') ) {
              readingObj.weight = res.data.weightReadings[iii].weight_reading;
            }
          }

          compReadings.push(readingObj);

        }
        console.log('RES.data2', compReadings)

      })
  }

  // handleReturnClick () {
  //   this.props.history.push('/module/charts/' + this.clientName + '/' + this.moduleName + '/' + this.moduleId);
  // }

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
              <p><i className="fa fa-leaf" aria-hidden="true"></i> Client: {this.clientName}</p>
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
                <p>Download CSV file</p>
              </div>
              {/* <MySpreadsheet data={this.state.tempData} labels={this.state.tempLabels} chartType={'Temp'} /> */}
            </div>

          </div>
        </section>

      </div>
    )
  }
}

export default ModuleSpreadsheets;
