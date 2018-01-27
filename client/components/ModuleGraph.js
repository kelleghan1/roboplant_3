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
      moduleId: this.props.match.params.moduleId,
      tempData:{
        labels: [],
        datasets:[
          {
            label:'Temperature (C)',
            data:[],
            backgroundColor: 'rgba(115, 167, 66, 0.2)',
            borderColor: 'rgba(115, 167, 66, 1)'
          }
        ]
      },
      humData:{
        labels: [],
        datasets:[
          {
            label:'Humidity (%)',
            data:[],
            backgroundColor: 'rgba(115, 167, 66, 0.2)',
            borderColor: 'rgba(115, 167, 66, 1)'
          }
        ]
      },
      weightData:{
        labels: [],
        datasets:[
          {
            label:'Weight (Kg)',
            data:[],
            backgroundColor: 'rgba(115, 167, 66, 0.2)',
            borderColor: 'rgba(115, 167, 66, 1)'
          }
        ]
      }
    }
  }

  componentDidMount() {
    console.log('STATE', this.state);
    const socket = openSocket('http://localhost:4200');
    socket.off('temperature');
    socket.off('humidity');
    socket.off('weight');
    socket.on('temperature', data => {
      this.setState({recentTemp: data.temperature});
    })
    socket.on('humidity', data => {
      this.setState({recentHum: data.humidity});
    })
    socket.on('weight', data => {
      this.setState({recentWeight: data.weight});
    })
    axios.get('/get_module/' + this.state.moduleId)
    .then(res => {
      let tempData = this.state.tempData;
      let humData = this.state.humData;
      let weightData = this.state.weightData;

      console.log('TEMP DATA', tempData.datasets);

      for(let index in res.data.temperatureReadings){
        tempData.labels.push(Moment(res.data.temperatureReadings[index].time).format('MM/DD, h:mm'));
        tempData.datasets[0].data.push(parseFloat(res.data.temperatureReadings[index].temperature_reading));
      }

      for(let index in res.data.humidityReadings){
        humData.labels.push(Moment(res.data.humidityReadings[index].time).format('MM/DD, h:mm'));
        humData.datasets[0].data.push(parseFloat(res.data.humidityReadings[index].temperature_reading));
      }

      for(let index in res.data.weightReadings){
        tempData.labels.push(Moment(res.data.weightReadings[index].time).format('MM/DD, h:mm'));
        tempData.datasets[0].data.push(parseFloat(res.data.weightReadings[index].temperature_reading));
      }

      this.setState(tempData)
      console.log('STATE', this.state);

    })
  }

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
              <MyChart data={this.state.tempData} chartType={'Temp'} />
            </div>


            <div className="content-wrap" id="tempReadings">
              <div className="section-header">
                <p>Humidity Readings</p>
              </div>
              <MyChart data={this.state.humData} chartType={'Humidity'} />
            </div>


            <div className="content-wrap" id="tempReadings">
              <div className="section-header">
                <p>Weight Readings</p>
              </div>
              <MyChart data={this.state.weightData} chartType={'Weight'} />
            </div>

          </div>
        </section>

      </div>
    )
  }
}


export default ModuleGraph;
