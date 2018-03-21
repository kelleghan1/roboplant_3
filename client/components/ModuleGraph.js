import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Popup from 'react-popup';
import Loading from './Loading';
import MyChart from './MyChart';
import openSocket from 'socket.io-client';
import Moment from 'moment';

class ModuleGraph extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSet: false,
      moduleId: this.props.match.params.moduleId,
      tempData: [],
      tempLabels: [],
      humData: [],
      humLabels: [],
      weightData: [],
      weightLabels: [],
    }
  }

  componentDidMount() {
    const socket = openSocket('http://localhost:4200');
    socket.off('temperature');
    socket.off('humidity');
    socket.off('weight');

    socket.on('temperature', data => {
      if (this.state.dataSet) {

        let tempData = this.state.tempData.slice(0);
        let tempLabels = this.state.tempLabels.slice(0);

        tempLabels.push(Moment(data.time).format('MM/DD, h:mm'));
        tempData.push(parseFloat(data.temperature));
        this.setState({tempData: tempData, tempLabels: tempLabels, recentTemp: data.temperature});
      }
    })

    socket.on('humidity', data => {
      // this.setState({recentHum: data.humidity});
      if (this.state.dataSet) {
        console.log('HUMIDITY', data)

        let humData = this.state.humData.slice(0);
        let humLabels = this.state.humLabels.slice(0);

        humLabels.push(Moment(data.time).format('MM/DD, h:mm'));
        humData.push(parseFloat(data.humidity));
        this.setState({humData: humData, humLabels: humLabels, recentHum: data.humidity});
      }
    })

    socket.on('weight', data => {
      // this.setState({recentWeight: data.weight});
      if (this.state.dataSet) {
        let weightData = this.state.weightData.slice(0);
        let weightLabels = this.state.weightLabels.slice(0);

        weightLabels.push(Moment(data.time).format('MM/DD, h:mm'));
        weightData.push(parseFloat(data.weight));
        this.setState({weightData: weightData, weightLabels: weightLabels, recentHum: data.weight});
      }
    })

    axios.get('/get_module/' + this.state.moduleId)
    .then(res => {
      let tempData = [];
      let tempLabels = [];

      let humData = [];
      let humLabels = [];

      let weightData = [];
      let weightLabels = [];

      for(let index in res.data.temperatureReadings){
        tempLabels.push(Moment(res.data.temperatureReadings[index].time).format('MM/DD, h:mm'));
        tempData.push(parseFloat(res.data.temperatureReadings[index].temperature_reading));
      }

      for(let index in res.data.humidityReadings){
        humLabels.push(Moment(res.data.humidityReadings[index].time).format('MM/DD, h:mm'));
        humData.push(parseFloat(res.data.humidityReadings[index].humidity_reading));
      }

      for(let index in res.data.weightReadings){
        weightLabels.push(Moment(res.data.weightReadings[index].time).format('MM/DD, h:mm'));
        weightData.push(parseFloat(res.data.weightReadings[index].weight_reading));
      }

      let theData = {
        dataSet: true,
        tempData: tempData,
        tempLabels: tempLabels,
        humData: humData,
        humLabels: humLabels,
        weightData: weightData,
        weightLabels: weightLabels
      }

      this.setState(theData);
    })
  }

  // changeHandler() {
  //   console.log('RERENDER')
  //   React.render()
  // }

  render() {
    return (
      <div>
        <Header />
        <section>
          <div className="container" id="module_info">
            <div className="client-header">
              <div id="return-button">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                Return To Client clientName
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container" id="module_info">
            <div className="client-header">
              <p><i className="fa fa-leaf" aria-hidden="true"></i> Module: moduleName</p>
            </div>
          </div>
        </section>

        <section>
          <div className="container">

            <div className="content-wrap" id="tempReadings">
              <div className="section-header">
                <p>Temperature Readings</p>
              </div>
              <MyChart data={this.state.tempData} labels={this.state.tempLabels} chartType={'Temp'} />
            </div>

            <div className="content-wrap" id="humReadings">
              <div className="section-header">
                <p>Humidity Readings</p>
              </div>
              <MyChart data={this.state.humData} labels={this.state.humLabels} chartType={'Humidity'} />
            </div>

            <div className="content-wrap" id="weightReadings">
              <div className="section-header">
                <p>Weight Readings</p>
              </div>
              <MyChart data={this.state.weightData} labels={this.state.weightLabels} chartType={'Weight'} />
            </div>

          </div>
        </section>

      </div>
    )
  }
}


export default ModuleGraph;
