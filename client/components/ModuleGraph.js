import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Popup from 'react-popup';
import Loading from './Loading';
import MyChart from './MyChart';
import ReactHighcharts from 'react-highcharts';
// import { withHighcharts, HighchartsChart, Chart } from 'react-jsx-highcharts';
// import Highcharts from 'highcharts';

class ModuleGraph extends React.Component {

  constructor(props) {
    super(props);
    this.state = {moduleId: this.props.match.params.moduleId};
  }

  componentDidMount() {
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

              <MyChart moduleId={this.state.moduleId}/>

              <table>
                <tbody>

                  <tr>
                    <th>Sensor ID</th>
                    <th>Time</th>
                    <th>Temp</th>
                  </tr>

                  <tr>
                    <td>reading.sensor_id</td>
                    <td>getTime()</td>
                    <td>reading.temperature_reading + " F"</td>
                  </tr>

                </tbody>
              </table>

            </div>

            <div className="content-wrap" id="humReadings">

              <div className="section-header">
                <p>Humidity Readings</p>
              </div>

              <canvas id="humChart" width="400" height="150"></canvas>

              <table>
                <tbody>

                  <tr>
                    <th>Sensor ID</th>
                    <th>Time</th>
                    <th>Hum</th>
                  </tr>

                  <tr>
                    <td>reading.sensor_id</td>
                    <td>getTime()</td>
                    <td>reading.humidity_reading + " %"</td>
                  </tr>

                </tbody>
              </table>

            </div>

            <div className="content-wrap" id="weightReadings">

              <div className="section-header">
                <p>Weight Readings</p>
                <p>weightDisplay</p>
              </div>

              <canvas id="weightChart" width="400" height="150"></canvas>


              <table>
                <tbody>
                  <tr>
                    <th>Sensor ID</th>
                    <th>Time</th>
                    <th>Weight</th>
                  </tr>

                  <tr>
                    <td>reading.sensor_id</td>
                    <td>getTime()</td>
                    <td>reading.weight_reading</td>
                  </tr>

                </tbody>
              </table>

            </div>

          </div>
        </section>

      </div>
    )
  }
}


export default ModuleGraph;
