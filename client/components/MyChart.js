import axios from 'axios';
import React, { Component } from 'react';
import Moment from 'moment';
import { Line } from 'react-chartjs-2';

class MyChart extends Component  {

  constructor(props) {
    super(props);
    // this.state = {data: this.props.data};
    // this.state = {
    //   data: [],
    //   labels: []
    // }
    this.state = {
      labels: [],
      datasets:[
        {
          label: this.props.chartType === 'Temp' ? 'Temperature (C)' : this.props.chartType === 'Humidity' ? 'Humidity (%)' : this.props.chartType === 'Weight' ? 'Weight (g)' : '',
          data: [],
          backgroundColor: 'rgba(115, 167, 66, 0.2)',
          borderColor: 'rgba(115, 167, 66, 1)'
        }
      ]
    }
  };

  componentWillReceiveProps(props) {
    const newData = props.data.map((item) => {return item;})
    const newLabels = props.labels.map((item) => {return item;})
    this.setState({
      labels: newLabels,
      datasets:[
        {
          label: this.props.chartType === 'Temp' ? 'Temperature (C)' : this.props.chartType === 'Humidity' ? 'Humidity (%)' : this.props.chartType === 'Weight' ? 'Weight (g)' : '',
          data: newData,
          backgroundColor: 'rgba(115, 167, 66, 0.2)',
          borderColor: 'rgba(115, 167, 66, 1)'
        }
      ]
    })
  }

  render() {
    console.log('CHART', this.props.chartType)
    const options = {
      // title:{
      //   display: this.props.chartType
      // },
      // datasetFill: false,
      // responsive: true
      // maintainAspectRatio: false
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      }
    }
    
    const chartData = {
      labels: this.state.labels,
      datasets:[
        {
          label:'Temperature (C)',
          data: this.state.data,
          backgroundColor: 'rgba(115, 167, 66, 0.2)',
          borderColor: 'rgba(115, 167, 66, 1)'
        }
      ]
    }

    return (
      <div>
        <Line
          redraw={true}
          data={this.state}
          options={options}
          />
      </div>

    )
  }
}


export default MyChart;
