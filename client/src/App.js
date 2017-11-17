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
import {Row, Col, Navbar, NavItem, Button } from 'react-materialize';
import Modal from 'react-modal';
import 'react-select/dist/react-select.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '25px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(196, 50, 53)'
  }
};

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: {},
      campaign: {},
      loginIsOpen: false,
      signUpIsOpen: false,
      isCampaign: false
    }
    this.liftTokenToState = this.liftTokenToState.bind(this)
    this.logOut = this.logOut.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.getCampaign = this.getCampaign.bind(this)
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openSignUp = this.openSignUp.bind(this);
    this.afterOpenSignUp = this.afterOpenSignUp.bind(this);
    this.closeSignUp = this.closeSignUp.bind(this);
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
  openModal() {
    this.setState({ loginIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ loginIsOpen: false });
  }

  openSignUp() {
    this.setState({ signUpIsOpen: true });
  }

  afterOpenSignUp() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeSignUp() {
    this.setState({ signUpIsOpen: false });
  }

  render() {
    var theUser = this.state.user
    if (typeof this.state.user === 'object' && Object.keys(this.state.user).length !== 0) {
      if (this.state.isCampaign === true) {
        return (
          <Router>
            <div className='App'>
                <Navbar brand="Oversee D&amp;D" right className="brand-logo">
                  <li><NavLink to='/profile' onClick={this.profileView} className="redHover" >Profile</NavLink></li>
                  <li onClick={this.logOut}><NavLink to='/' className="redHover">Log Out</NavLink></li>
                </Navbar>
                <Route path='/profile' render={(props) => (
                  <UserProfile {...props} user={this.state.user} logout={this.logout} getCampaign={this.getCampaign} />
                )} />
                <Route exact path='/' component={Home} />
            </div>
          </Router>
        )
      } else {
        return (
          <Router>
            <div className='App'>
              <Navbar brand="Oversee D&amp;D" right className="brand-logo">
                <li><NavLink to='/profile' onClick={this.profileView} className="redHover">Profile</NavLink></li>
                <li onClick={this.logOut}><NavLink to='/' className="redHover">Log Out</NavLink></li>
                </Navbar>
                <Route path='/profile' render={(props) => (
                  <UserProfile {...props} user={this.state.user} logout={this.logout} getCampaign={this.getCampaign} />
                )} />
                <Route exact path='/' component={Home} />
            </div>
          </Router>
        )};
      } else {
        return (
          <Router>
            <div className='App'>
              <Navbar brand="Oversee D&amp;D" right className="brand-logo">
                <li ><a onClick={this.openModal} className="redHover">Login</a></li>
                <li ><a onClick={this.openSignUp} className="redHover">Sign Up</a></li>
              </Navbar>
              <Modal
                isOpen={this.state.loginIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Login Modal"
              >
                <h2 className="purpleShade" ref={subtitle => this.subtitle = subtitle}>Login</h2>
                <Login lift={this.liftTokenToState}/>
                <Button className="fltRight" onClick={this.closeModal}>Cancel</Button>
              </Modal>
              <Modal
                isOpen={this.state.signUpIsOpen}
                onAfterOpen={this.afterOpenSignUp}
                onRequestClose={this.closeSignUp}
                style={customStyles}
                contentLabel="Sign Up Modal"
              >
                <h2 className="purpleShade" ref={subtitle => this.subtitle = subtitle}>Sign Up</h2>
                <Signup lift={this.liftTokenToState} />
                <Button className="inline" onClick={this.closeSignUp}>Cancel</Button>
              </Modal>
              <Home />
            </div>
          </Router>
      );
    }
  }
}

export default App;
