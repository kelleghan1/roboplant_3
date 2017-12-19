import React from 'react';
import Header from './Header';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Popup from 'react-popup';
import Loading from './Loading';
import Module from './Module';
import FieldWorker from './FieldWorker';
import ModuleForm from './ModuleForm';

class Client extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
    this.submitWorker = this.submitWorker.bind(this);
    this.submitModule = this.submitModule.bind(this);
    this.updateModule = this.updateModule.bind(this);
    this.renderWorkers = this.renderWorkers.bind(this);
  }

  componentDidMount() {
    axios.get('/get_client/' + this.props.match.params.clientId)
    .then(res => {
      this.setState(res);
      this.setState({loading: false});
    })
  }

  submitWorker(event){
    this.setState({loading: true});
    let submitObj = {
      workerName: event.target.worker_name.value,
      clientId: this.props.match.params.clientId
    }
    axios.post('/create_worker', submitObj)
    .then(res => {
      this.updateWorker();
      this.setState({loading: false});
    })
    event.preventDefault();
  }

  submitModule(event) {
    event.preventDefault();
    const moduleName = event.target.moduleName.value;
    const moduleType = event.target.moduleType.value;
    const clientId = this.props.match.params.clientId;
    const reqObj = {moduleName: moduleName, moduleType: moduleType, clientId: clientId}
    this.setState({loading: true});
    axios.post( "/create_module", reqObj )
    .then( (res) => {
      if (res.data.moduleExists) {
        let responseMessage = 'Module ' + moduleName + ' already exists.';
        this.setState({loading: false});
        Popup.create({
          title: null,
          closeOnOutsideClick: true,
          content: responseMessage,
          buttons: {
            right: [{
              text: 'Ok',
              className: 'success',
              action: () => {
                Popup.close();
              }
            }]
          }
        })
      } else {
        let responseMessage = 'Module ' + moduleName + ' created.';
        Popup.create({
          title: null,
          closeOnOutsideClick: true,
          content: responseMessage,
          buttons: {
            right: [{
              text: 'Ok',
              className: 'success',
              action: () => {
                this.setState({loading: true});
                axios.get('/get_client/' + this.props.match.params.clientId).then(
                  (res) => {
                    this.setState(res);
                    this.setState({loading: false});
                  }
                )
                Popup.close();
              }
            }]
          }
        })
      }
    })
  }

  updateModule(data) {
    this.setState({loading: true});
    axios.post("/update_module", data)
    .then( res => {
      axios.get('/get_client/' + this.props.match.params.clientId).then(
        (res) => {
          this.setState(res);
          this.setState({loading: false});
        }
      )
    })

  }

  updateWorker() {
    this.setState({loading: true});
    axios.get('/get_client/' + this.props.match.params.clientId)
    .then(res => {
      this.setState(res);
      this.setState({loading: false});
    })
  }

  renderModules() {
    return this.state.data.modules.map((item, index) => {
      return (
        <ModuleForm key={index} handleModuleUpdate={this.updateModule} moduleData={item} />
      )
    })
  }

  renderWorkers(){
    return this.state.data.workers.map((item, index) => {
      return (
        <FieldWorker key={index} handleWorkerUpdate={this.updateWorker} workerData={item} />
      )
    })
  }

  render() {
    return (
      <div>

        <Header />

        <section>
          <div className="container">
            <div className="client-header">
              <p><i className="fa fa-user" aria-hidden="true"></i> Client: {this.props.match.params.clientName}</p>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="form-wrap">
              <div className="section-header">
                <p><i className="fa fa-plus" aria-hidden="true"></i> Create Worker</p>
              </div>
              <div className="module-wrap">
                <div className="create-module-content">
                  <p>Add workers to the client</p>
                  <form name="createClientForm" onSubmit={this.submitWorker}>
                    <label>Worker Name</label>
                    <input type="text" name="worker_name" required />
                    <input type="submit" value="Submit" />
                  </form>
                  { this.state.data ? this.renderWorkers() : "No workers" }
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="form-wrap">
              <div className="section-header">
                <p><i className="fa fa-plus" aria-hidden="true"></i> Create Module</p>
              </div>
              <div className="module-wrap">
                <div className="create-module-content">
                  <p>A module is a subject that will have readings allocated to it. Select a name and a type.</p>
                  <form name="createModuleForm" onSubmit={ this.submitModule }>
                    <label>Module Name</label>
                    <input type="text" name="moduleName" required />
                    <br />
                    <label>Module Type</label>
                    <select id="module-generate-type" name="moduleType" required>
                      <option value="">Select</option>
                      <option>Trimmer</option>
                      <option>Waste</option>
                      <option>Environemnt</option>
                    </select>
                    <br />
                    <input type="submit" value="Submit" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div id="modules">
              <div className="section-header">
                <p><i className="fa fa-thermometer-three-quarters" aria-hidden="true"></i> Modules</p>
              </div>
              { this.state.data ? this.renderModules() : "No modules" }
            </div>
          </div>
          { this.state.loading ? <Loading /> : '' }
        </section>
      </div>
    );
  }
}


export default Client;
