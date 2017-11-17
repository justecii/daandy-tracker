import React, { Component } from 'react';
import {Row, Col, Button} from 'react-materialize';
import CharacterList from './CharacterList';
import MapsList from './MapsList';
import NotesList from './NotesList';
import UserList from './UserList';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';

class CurrentCamp extends Component {
    constructor(props){
        super(props)
    
    }
    render(){
        return(
            <div>
                <Row>
                    <h2>{this.props.campaign.title} - Campaign</h2>
                </Row>
                <Row>
                    <Router>
                        <div className="currentCamp">
                            <ul className='campaignNav'>
                                <Link className="campaignList" to='/characters'>Characters</Link>
                                <Link className="campaignList" to='/maps'>Maps</Link>
                                <Link className="campaignList" to='/notes'>Notes</Link>
                                <Link className='campaignList' to='/users'>Users</Link>
                            </ul>
                            <Route path='/characters' render={(props) => (
                                <CharacterList {...props} user={this.props.user} campaign={this.props.campaign} />
                            )} />
                            <Route path='/maps' render={(props) => (
                                <MapsList {...props} user={this.props.user} campaign={this.props.campaign} />
                            )} />
                            <Route path='/notes' render={(props) => (
                                <NotesList {...props} user={this.props.user} campaign={this.props.campaign}/>
                            )} />
                            <Route path='/users' render={(props) => (
                                <UserList {...props} user={this.props.user} campaign={this.props.campaign} />
                            )} />
                        </div>
                    </Router>
                </Row>
            </div>
        )
    }
}

export default CurrentCamp;