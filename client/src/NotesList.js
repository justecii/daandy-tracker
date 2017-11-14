import React, {Component} from 'react';
import { Input, Button } from 'react-materialize';
import axios from 'axios';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';

class NotesList extends Component{
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            title: '',
            content: ''
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount() {
        var campaignId = this.props.campaign._id;
        console.log(campaignId)
        axios.post('/users/notes', {
            campaign: campaignId,
            user: this.props.user
        }).then(result => {
            this.setState({ notes: result.data })
            console.log(this.state.notes)
        })
    }
    titleSubmit(e) {
        var set = e.target.value;
        this.setState({
            title: set
        });
    }
    contentSubmit(e) {
        var set = e.target.value;
        this.setState({
            content: set
        });
    }
    onClick(e) {
        e.preventDefault();
        axios.post('/users/notes/new', {
            title: this.state.title,
            content: this.state.content,
            campaign: this.props.campaign._id
        })
    }
    render(){
        let mappedNotes = this.state.notes.map((item, index) => (
            <li key={index}>{item.title}</li>
            )
        )
        return(
            <div>
                {mappedNotes}
                <form>
                    <Input label='Title' onInput={(e) => this.titleSubmit(e)} />
                    <Input label='Note' onInput={(e) => this.contentSubmit(e)} />
                    <Button onClick={(e) => this.onClick(e)}>Save Note</Button>
                </form>
            </div>
        )
    }
}

export default NotesList;