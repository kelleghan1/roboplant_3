import axios from 'axios';
import React, { Component } from 'react';
import Moment from 'moment';
import { Line } from 'react-chartjs-2';

class MyChart extends Component  {

  constructor(props) {
    super(props);
    this.state = {data: this.props.data};
    // this.state = {
    //   dataSet: false,
    //   moduleId: this.props.match.params.moduleId,
    //   tempData:{
    //     labels: [],
    //     datasets:[
    //       {
    //         label:'Temperature (C)',
    //         data:[],
    //         backgroundColor: 'rgba(115, 167, 66, 0.2)',
    //         borderColor: 'rgba(115, 167, 66, 1)'
    //       }
    //     ]
    //   },
    //   humData:{
    //     labels: [],
    //     datasets:[
    //       {
    //         label:'Humidity (%)',
    //         data:[],
    //         backgroundColor: 'rgba(115, 167, 66, 0.2)',
    //         borderColor: 'rgba(115, 167, 66, 1)'
    //       }
    //     ]
    //   },
    //   weightData:{
    //     labels: [],
    //     datasets:[
    //       {
    //         label:'Weight (Kg)',
    //         data:[],
    //         backgroundColor: 'rgba(115, 167, 66, 0.2)',
    //         borderColor: 'rgba(115, 167, 66, 1)'
    //       }
    //     ]
    //   }
    // }
  };

  componentDidMount() {
    console.log('PROPS', this.props);
    console.log('STATE', this.state);
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
          data={this.state.data}
          options={options}
          />
      </div>

    )
  }
}


export default MyChart;
