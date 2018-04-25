import React from 'react';
import Header from './Header';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Popup from 'react-popup';
import Loading from './Loading';
import openSocket from 'socket.io-client';

class ModuleForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      moduleData: this.props.moduleData,
      charHigh: (this.props.moduleData.moduleNotes >= 250),
      recentTemp: this.props.moduleData.temperature_reading,
      recentHum: this.props.moduleData.humidity_reading,
      recentWeight: this.props.moduleData.weight_reading
    }
    this.moduleUpdate = this.moduleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.viewGraphs = this.viewGraphs.bind(this);
    this.socket = openSocket('http://localhost:4200');     
  }

  componentDidMount () {
    this.socket.on('temperature', data => {
      if (data.moduleId === this.state.moduleData.module_id) {
        this.setState({recentTemp: data.temperature});
      }
    })
    this.socket.on ('humidity', data => {
      if (data.moduleId === this.state.moduleData.module_id) {
        this.setState({recentHum: data.humidity});
      }
    })
    this.socket.on ('weight', data => {
      if (data.moduleId === this.state.moduleData.module_id) {
        this.setState({recentWeight: data.weight});
      }
    })
  }

  componentWillUnmount () {
    this.socket.close();
  }

  viewGraphs () {
    this.props.history.push('/module/graphs/' + this.props.moduleData.module_name + '/' + this.props.moduleData.module_id);
  }

  moduleUpdate (event) {
    if (!this.state.charHigh) {
      const reqObj = {
        clientId: this.state.moduleData.client_id,
        moduleId: this.state.moduleData.module_id,
        sensorId: event.target.sensor_id.value,
        scaleId: event.target.scale_id.value,
        moduleNotes: event.target.module_notes.value
      };
      this.props.handleModuleUpdate(reqObj);
    }
    event.preventDefault();
  }

  handleChange (event) {
    let changeObj = this.state.moduleData;
    let charCount = event.target.value.length;
    changeObj[event.target.name] = event.target.value;
    this.setState({moduleData: changeObj});
    if (charCount >= 250) {
      this.setState({charHigh: true})
    } else {
      this.setState({charHigh: false})
    }
  }

  render () {
    return (

      <div className="module-wrap">

        <div className="module-header" >
          <p><i className="fa fa-leaf"></i><i className="fa fa-chevron-down"></i>{this.state.moduleData.module_name}</p>
        </div>

        <div className="module-content">

          <div className="animation module-inner">

            <p className="view-readings" onClick={this.viewGraphs}>View Readings <i className="fa fa-arrow-right" aria-hidden="true"></i></p>
            <p className="delete-module"><i className="fa fa-trash" aria-hidden="true"></i> Delete Module</p>

            <p>Sensor ID: {this.state.moduleData.sensor_id ? this.state.moduleData.sensor_id : ''}</p>
            <p>Scale ID: {this.state.moduleData.scale_id ? this.state.moduleData.scale_id : ''}</p>

            <p>Weight: {this.state.recentWeight}</p>
            <p>Temperature: {this.state.recentTemp}</p>
            <p>Humidity: {this.state.recentHum}</p>

            <form name="updateForm" className="" method="post" onChange={this.handleChange} onSubmit={this.moduleUpdate}>

              <div className="module-option">
                <label>Assign Sensor</label>
                <select value={this.state.moduleData.sensor_id} onChange={this.handleChange} className="" name="sensor_id">
                  <option value=""></option>
                  <option value="21">21</option>
                  <option value="23">23</option>
                </select>
              </div>

              <div className="">
                <label>Assign Scale</label>
                <select value={this.state.moduleData.scale_id} onChange={this.handleChange} className="" name="scale_id">
                  <option value=""></option>
                  <option value="22">22</option>
                </select>
              </div>

              <div className="">
                <label>Notes</label>
                <textarea name="module_notes" onChange={this.handleChange} value={this.state.moduleData.module_notes ? this.state.moduleData.module_notes : ''} rows="3"></textarea>
                {
                  this.state.charHigh ? <span className="warning">Notes cannot contain more than 250 characters</span> : ''
                }
              </div>

              <input type='submit' value='Submit' />

            </form>

          </div>


        </div>


      </div>

    )
  }
}


export default withRouter(ModuleForm);
