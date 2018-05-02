import axios from 'axios';
import React, { Component } from 'react';
import Moment from 'moment';
import { Line } from 'react-chartjs-2';

class MyChart extends Component  {
  constructor(props) {
    super(props);
    this.chartUnit = props.chartType === 'Temperature' ? '(C)' : this.props.chartType === 'Humidity' ? '(%)' : this.props.chartType === 'Weight' ? '(g)' : '',    
    this.state = {
      labels: [],
      datasets:[
        {
          label: props.chartType + ' ' + this.chartUnit,
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
          label: props.chartType + ' ' + this.chartUnit,
          data: newData,
          backgroundColor: 'rgba(115, 167, 66, 0.2)',
          borderColor: 'rgba(115, 167, 66, 1)'
        }
      ]
    })
  }

  render() {
    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      }
    }
    
    return (
      <Line
        redraw={false}
        data={this.state}
        options={options}
      />
    )
  }
}


export default MyChart;
