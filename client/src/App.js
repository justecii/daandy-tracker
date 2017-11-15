import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link, 
  NavLink
} from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import UserProfile from './UserProfile';
import Campaigns from './Campaigns';
import CurrentCamp from './CurrentCamp';
import Home from './Home'
import axios from 'axios';
import {Row, Col, Navbar, NavItem } from 'react-materialize';
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
    this.logOut = this.logOut.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.getCampaign = this.getCampaign.bind(this)
  }

  liftTokenToState(data) {
    this.setState({token: data.token, user: data.user})
  }

  logOut(event) {
    localStorage.removeItem('mernToken')
    this.setState({
      token: '',
      user: {},
      campaign: {},
      isCampaign: false
    })
    console.log("CLICKED LOGOUT")
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
  //resets screen to home page
  returnHome(e){
    this.setState({isCampaign: false})
  }
  profileView(e){
    console.log("You clicked the profile page")
    this.setState({isCampaign: false})
  }

  render() {
    var theUser = this.state.user
    if (typeof this.state.user === 'object' && Object.keys(this.state.user).length !== 0) {
      if (this.state.isCampaign === true) {
        return (
          <Router>
            <div className='App'>
              <Navbar brand="DandD" right className="brand-logo">
                <li><NavLink to='/profile' onClick={this.profileView}>Profile</NavLink></li>
                <li onClick={this.logOut}><NavLink to='/'>Log Out</NavLink></li>
              </Navbar>
              <Route path='/profile' render={(props) => (
                <UserProfile {...props} user={this.state.user} logout={this.logout} getCampaign={this.getCampaign} />
              )} />
              <Route exact path='/' component={Home} />
              WHAT ROUTE
              <CurrentCamp user={this.state.user} campaign={this.state.campaign}/>
            </div>
          </Router>
        )
      } else {
        return (
          <Router>
            <div className='App'>
              <Navbar brand="DandD" right className="brand-logo">
                <li><NavLink to='/profile' onClick={this.profileView}>Profile</NavLink></li>
                <li onClick={this.logOut}><NavLink to='/'>Log Out</NavLink></li>
              </Navbar>
              <Route path='/profile' render={(props) => (
                <UserProfile {...props} user={this.state.user} logout={this.logout} getCampaign={this.getCampaign} />
              )} />
              <Route exact path='/' component={Home} />
              <Row>
                  <UserProfile user={this.state.user} logout={this.logout} getCampaign={this.getCampaign}/>
              </Row>
            </div>
          </Router>
        )};
      } else {
        return (
          <Router>
            <div className='App'>
              <Navbar brand="DandD" right className="brand-logo">
                <li><NavLink to='/login'>Login</NavLink></li>
                <li><NavLink to='/signup'>Sign Up</NavLink></li>
              </Navbar>
              <Route path='/login' render={(props) => (
                <Login {...props} lift={this.liftTokenToState} />
              )} />
              <Route path='/signup' render={(props) => (
                <Signup {...props} lift={this.liftTokenToState} />
              )} />
              <Home />
            </div>
          </Router>
      );
    }
  }
}

export default App;
