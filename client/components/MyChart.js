import axios from 'axios';
import React, { Component } from 'react';
import Highcharts from 'highcharts';
import Moment from 'moment';
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Subtitle,
  Legend,
  LineSeries
} from 'react-jsx-highcharts';


class MyChart extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {moduleId: this.props.moduleId};
  };

  componentDidMount() {
    axios.get('/get_module/' + this.state.moduleId)
    .then(res => {
      this.setState(res);
      console.log('STATE', this.state);
    })
  };

  render() {

    const plotOptions = {
      global: {
        useUTC: false
      },
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%d %b %Y'    //ex- 01 Jan 2016
      }
    }


    let tempData = [];
    if (this.state.data) {
      this.state.data.temperatureReadings.map((item, index) => {
        // console.log(Date.UTC(2013,5,2));
        let datetime = Highcharts.dateFormat('%b %H:%M:%S', new Date(item.time).getTime());
        console.log(datetime);

        tempData.push([
          // Date.UTC((2017),(5 + index),2),
          datetime,
          // item.time,
          // new Date(item.time).getTime(),
          parseInt(item.temperature_reading)
        ])
      });
    }

    console.log('DATA', tempData);

    return (

      <div className="app">
        <HighchartsChart plotOptions={plotOptions}>
          <Chart />

          <Title>Temp</Title>

          <Subtitle>Temperature change over time</Subtitle>

          <XAxis>
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis id="number">
            <LineSeries id="installation" data={tempData} />
          </YAxis>
        </HighchartsChart>
      </div>

    )

  }
}


export default withHighcharts(MyChart, Highcharts);
