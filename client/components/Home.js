import React from 'react';
import Header from './Header';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Popup from 'react-popup';
import Loading from './Loading';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clientArr: [],
      loading: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    Popup.clearQueue()
    axios.get('/get_client_list').then(
      (res) => {
        this.setState({
          clientArr: res.data,
          loading: false
        })
      }
    )
  }

  renderList() {
    return this.state.clientArr.map((client, i) => {
      return (
        <p key={i}>{client.client_name}</p>
      )
    })
  }

  handleSubmit(event) {
    event.target.clientName.blur();
    const clientName = event.target.clientName.value;
    axios.get( "/submit_client/" + clientName )
    .then( (res) => {
      let responseMessage = '';
      let clientExists;
      this.setState({loading: false})

      if (res.data.clientExists) {
        responseMessage = 'Access client ' + clientName + '?';
        clientExists = true;
      } else {
        responseMessage = 'Create new client ' + clientName + '?';
        clientExists = false;
      }

      Popup.create({
        title: null,
        closeOnOutsideClick: true,
        content: responseMessage,
        buttons: {
          left: [{
            text: 'Cancel',
            className: 'danger',
            action: () => {
              Popup.close();
            }
          }],
          right: [{
            text: 'Ok',
            className: 'success',
            action: () => {
              if (!clientExists) {
                axios.post( "/create_client", {clientName: clientName} )
                .then( (res) => {
                  this.props.history.push('/Client/' + clientName + '/' + res.data.clientId);
                })
              } else {
                this.props.history.push('/Client/' + clientName + '/' + res.data.clientId);
              }

              Popup.close();
            }
          }]
        }
      })
    })
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Header />
        <section>
          <div className="container">
            <div className="content-wrap">
              <div className="home-content">
                <h3>Enter Client ID</h3>
                <p>Enter existing ID to view account or enter new ID to create a new account.</p>
                <form onSubmit={ this.handleSubmit }>
                  <input type="text" name="clientName" required/>
                  <input type="submit" />
                </form>
              </div>
            </div>
            <div className="content-wrap">
              <div className="home-content">
                <h3>Select Client</h3>
                <p>Click on a client to view modules.</p>
                <div>
                  { this.renderList() }
                </div>
              </div>
            </div>
          </div>
          { this.state.loading ? <Loading /> : '' }
        </section>
      </div>
    );
  }
}


export default withRouter(Home);
