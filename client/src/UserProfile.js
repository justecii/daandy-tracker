import React, { Component } from 'react';
import Logout from './Logout';
import Profile from './Profile';
import Campaigns from './Campaigns';
import NewCampaign from './NewCampaign';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user
    };
  }

  render() {
    return (
      <div className='UserProfileBox'>
        <p>Hello, {this.props.user.name}!</p>
        <Router>
          <div>
            <ul>
              <li>{this.props.user.name}</li>
              <li><Link to='/profile'>Profile</Link></li>
              <li><Link to='/campaigns/new'>New Campaign</Link></li>
              <li><Link to='/campaigns'>My Campaigns</Link></li>
            </ul>
            <Route path='/profile' component={Profile} />
            <Route path='/campaigns/new' render={(props) => (
              <NewCampaign {...props} user={this.state.user} />
            )} />
            <Route path='/campaigns' render={(props) => (
              <Campaigns {...props} user={this.state.user} getCampaign={this.props.getCampaign}/>
            )} />
           
          </div>
          
        </Router>
      </div>
    );
  }
}

export default UserProfile;
