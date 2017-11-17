import React, { Component } from 'react';
import Logout from './Logout';
import Profile from './Profile';
import Campaigns from './Campaigns';
import NewCampaign from './NewCampaign';
import {Row, Col} from 'react-materialize';
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
       
        <Router>
          <div>
            <Row>
              <Col s={3} m={3}>
                <h3>Hey, {this.props.user.name}!</h3>
              </Col>
              <Col s={9} m={9}>
                <ul className="userNav">
                  <Col s={12} m={4}><li><Link to='/profile'>Profile</Link></li></Col>
                  <Col s={12} m={4}><li><Link to='/campaigns/new'>New Campaign</Link></li></Col>
                  <Col s={12} m={4}><li><Link to='/campaigns' >My Campaigns</Link></li></Col>
                </ul>
              </Col>
              <Route path='/profile' component={Profile} />
              <Route path='/campaigns/new' render={(props) => (
                <NewCampaign {...props} user={this.state.user} />
              )} />
              <Route path='/campaigns' render={(props) => (
                <Campaigns {...props} user={this.state.user} getCampaign={this.props.getCampaign}/>
              )} />
            </Row>
          </div>
          
        </Router>
      </div>
    );
  }
}

export default UserProfile;
