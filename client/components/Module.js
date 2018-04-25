import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Popup from 'react-popup';
import Loading from './Loading';

class Module extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clientArr: [],
      loading: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("NEW PROPS", this.props.match.params.clientId, this.props.match.params.clientName);
    axios.get('/get_client/' + this.props.match.params.clientId).then(
      (res) => {
        console.log("CLIENT", res);
        this.setState(res);
        console.log("STATE", this.state);
      }
    )
  }

  moduleSubmit(event) {
    event.preventDefault();
  }

  render() {

    return (

      <div>

        <Header />

        <section>
          <div className="container">
            <div className="client-header">
              <p><i className="{'fa' 'fa-user'}" aria-hidden="true"></i> Client: {this.props.match.params.clientName}</p>
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
                  <form name="createClientForm">
                    <label>Worker Name</label>
                    <input type="text" name="workerName" required />
                    <input type="submit" value="Submit" />
                  </form>

                  <div className="worker-wrap">
                    <input type="checkbox" />
                    <label>Label</label>
                  </div>

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
                  <form name="createModuleForm">
                    <label>Module ID</label>
                    <input type="text" name="moduleName" required />
                    <br />
                    <label>Module Type</label>
                    <select id="module-generate-type" name="moduleType" required>
                      <option value="">Select</option>
                      <option value=""></option>
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

              <div className="module-wrap">

                <div className="module-header">
                  <p><i className="fa fa-leaf" aria-hidden="true"></i><i className="fa fa-chevron-down" aria-hidden="true"></i></p>
                </div>

                <div className="module-content">

                  <div className="animation module-inner">

                    <p className="view-readings">View Readings <i className="fa fa-arrow-right" aria-hidden="true"></i></p>
                    <p className="delete-module"><i className="fa fa-trash" aria-hidden="true"></i> Delete Module</p>

                    <p>Sensor ID:</p>
                    <p>Scale ID:</p>

                    <p>Weight:</p>
                    <p>Temperature:</p>
                    <p>Humidity:</p>

                    <form name="updateForm" className="" method="post">


                      <div className="module-option">
                        <label>Assign Sensor</label>
                        <select className="" name="sensorId"></select>
                      </div>

                      <div className="">
                        <label>Assign Scale</label>
                        <select className="" name="scaleId"></select>
                      </div>

                      <div className="">
                        <label>Notes</label>
                        <textarea name="notes" value="" rows="3"></textarea>
                        <span className="warning">Notes cannot contain more than 250 characters</span>
                      </div>

                      <input type='submit' value='Submit' />

                    </form>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>

        <section>
          <div className="container">
          </div>
        </section>

      </div>

    );
  }
}


export default Module;
