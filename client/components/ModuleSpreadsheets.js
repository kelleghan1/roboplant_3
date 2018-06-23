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
      loading: false
    }
    this.clientName = this.props.match.params.clientName;
    this.moduleName = this.props.match.params.moduleName;
    this.moduleId = this.props.match.params.moduleId;
    this.handleDownload = this.handleDownload.bind(this)
    this.handleReturnClick = this.handleReturnClick.bind(this)
  }

  componentDidMount() {
    this.setState({loading: true})
    axios.get('/get_module/' + this.state.moduleId)
      .then(res => {
        let compReadings = [];

        for (let i = 0; i < res.data.temperatureReadings.length; i++) {

          let readingObj = [];

          readingObj.push('"' + Moment(res.data.temperatureReadings[i].time).format('MM/DD, h:mm') + '"');
          readingObj.push(res.data.temperatureReadings[i].temperature_reading);

          for (let ii = 0; ii < res.data.humidityReadings.length; ii++) {
            if (
              (Moment(res.data.humidityReadings[ii].time).format('MM/DD, h:mm') ==
              Moment(res.data.temperatureReadings[i].time).format('MM/DD, h:mm')) &&
              readingObj.indexOf(res.data.humidityReadings[ii].humidity_reading) === -1
            ) {
              readingObj.push(res.data.humidityReadings[ii].humidity_reading);
              break;
            }
          }

          for (let iii = 0; iii < res.data.weightReadings.length; iii++) {
            if ( Moment(res.data.weightReadings[iii].time).format('MM/DD, h:mm') == Moment(res.data.temperatureReadings[i].time).format('MM/DD, h:mm') ) {
              readingObj.push(res.data.weightReadings[iii].weight_reading);
              break;
            }
          }

          if(readingObj.length < 4) {readingObj.push('')}

          compReadings.push(readingObj);

        }
        console.log('RES.data2', compReadings)
        this.setState({compReadings: compReadings, loading: false})
      })
  }

  handleDownload () {
      var csv = 'Time,Temp,Hum,Weight\n';
      this.state.compReadings.forEach(function(row) {
              csv += row.join(',');
              csv += "\n";
      });
   
      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'readings.csv';
      hiddenElement.click();
      console.log('CSV', hiddenElement)
  }

  handleReturnClick () {
    this.props.history.push('/module/graphs/' + this.clientName + '/' + this.moduleName + '/' + this.moduleId);
  }

  render () {
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
              <div>
                <p className="delete-module" onClick={this.handleDownload}><i className="fa fa-trash" aria-hidden="true"></i> Download CSV file</p>
              </div>
              {/* <MySpreadsheet data={this.state.tempData} labels={this.state.tempLabels} chartType={'Temp'} /> */}
            </div>

          </div>
          { this.state.loading ? <Loading /> : '' }          
        </section>

      </div>
    )
  }
}

export default ModuleSpreadsheets;
