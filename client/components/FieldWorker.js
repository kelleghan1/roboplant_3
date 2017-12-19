import React from 'react';
import ReactDom from 'react-dom';
import Popup from 'react-popup';
import axios from 'axios';


class Worker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workerData: this.props.workerData
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
  }

  handleChange(event) {
    let changeObj = this.state.workerData;
    changeObj.active = event.target.checked;
    this.setState({workerData: changeObj});
    let reqObj = {
      worker_id: this.state.workerData.worker_id,
      active: event.target.checked
    };
    axios.post('/update_worker', reqObj);
  }

  render() {
    return (
      <div className="worker-wrap">
        <input name="active" onChange={this.handleChange} type="checkbox" value={this.state.workerData.active} checked={this.state.workerData.active}/>
        <label>{this.props.workerData.worker_name}</label>
      </div>
    )
  }

};

export default Worker;
