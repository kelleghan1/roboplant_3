import axios from 'axios';
import React, { Component } from 'react';
import Moment from 'moment';
import { Line } from 'react-chartjs-2';

class MyChart extends Component  {

  constructor(props) {
    super(props);
  };

  componentDidMount() {
    console.log('PROPS', this.props);
  };

  render() {
    const options = {
      title:{
        display: this.props.chartType
      }
    }
    return (

      <div>
        <Line
          data={this.props.data}
          options={options}
          />
      </div>

    )
  }
}


export default MyChart;
