import React, { Component } from 'react';
import {Row, Col, Button} from 'react-materialize';
import CharacterList from './CharacterList';
import MapsList from './MapsList';
import NotesList from './NotesList';

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
    onClick(e){
        e.preventDefault();
        console.log(this.state)
        console.log(this.props)
    }
    render(){
        return(
            <div>
                <Row>
                    {this.props.campaign.title} featuring {this.props.campaign.users}
                </Row>
                <Row>
                    <Button onClick={(e) => this.onClick(e)}>Click for Props</Button>
                    <Router>
                        <div>
                            <ul>
                                <Link className="campaignList" to='/characters'>Characters</Link>
                                <Link className="campaignList" to='/maps'>Maps</Link>
                                <Link className="campaignList" to='/notes'>Notes</Link>
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
                        </div>
                    </Router>
                </Row>
            </div>
        )
    }
}

export default CurrentCamp;