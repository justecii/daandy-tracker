import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import UserProfile from './UserProfile';
import Campaigns from './Campaigns';
import CurrentCamp from './CurrentCamp'
import axios from 'axios';
import {Row, Col} from 'react-materialize';
import 'react-select/dist/react-select.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: {},
      campaign: {},
      isCampaign: false
    }
    this.liftTokenToState = this.liftTokenToState.bind(this)
    this.logout = this.logout.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.getCampaign = this.getCampaign.bind(this)
  }

  liftTokenToState(data) {
    this.setState({token: data.token, user: data.user})
  }

  logout() {
    localStorage.removeItem('mernToken')
    this.setState({token: '', user: {}})
  }

  componentDidMount() {
    // If there is a token in localStorage
    var token = localStorage.getItem('mernToken')
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: {}
      })
    } else {
      //   Validate the token against the server
      axios.post('/auth/me/from/token', {
        token: token
      }).then(response => {
        //   Store the token and user
        localStorage.setItem('mernToken', response.data.token)
        this.setState({
          token: response.data.token,
          user: response.data.user
        })
        //   Pass User into child components and display main app
      }).catch(err => {
        // Both the JWT and db errors will be caught here
        console.log(err)
      })
    }
  }
  getCampaign(camp){
    axios.post('/users/list', {
      id: camp
    }).then(result => {
      this.setState({campaign: result.data[0]})
      console.log(this.state.campaign)
      this.setState({isCampaign: true})
      // this.setState({toView: result})
    })
  }

  render() {
    var theUser = this.state.user
    if (typeof this.state.user === 'object' && Object.keys(this.state.user).length !== 0) {
      if (this.state.isCampaign === true) {
        return (
          <div>
            <h1>DandDy Tracker</h1>
            <CurrentCamp user={this.state.user} campaign={this.state.campaign}/>
          </div>
        )
      } else {
        return (
          <div className='App'>
            <h1>DandDy Tracker</h1>
            <Row>
              <Col s={4}>
                <UserProfile user={this.state.user} logout={this.logout} getCampaign={this.getCampaign}/>
              </Col>
              <Col s={8}>
                <Campaigns user={this.state.user} getCampaign={this.getCampaign} />
              </Col>
            </Row>
          </div>
        )};
      } else {
        return (
          <div className='App'>
            <h1>DandDy Tracker</h1>
            <div className='SignupBox'>
              <Signup lift={this.liftTokenToState} />
            </div>

            <div className='LoginBox'>
              <Login lift={this.liftTokenToState} />
            </div>

          </div>
      );
    }
  }
}

export default App;
