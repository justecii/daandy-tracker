import React, {Component} from 'react';
import { Input, Button, Row } from 'react-materialize';
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
            noteInfo: {},
            title: '',
            content: '',
            viewNote: false
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount() {
        var campaignId = this.props.campaign._id;
        axios.post('/users/notes', {
            campaign: campaignId,
            user: this.props.user
        }).then(result => {
            this.setState({ notes: result.data }) 
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
    viewNote(e){
        axios.post('/users/note/:id', {
            id: e.target.value
        }).then(result => {
            console.log(result.data[0])
            this.setState({
                noteInfo: result.data[0],
                viewNote: true
            })
        })
    }

    render(){
        let mappedNotes = this.state.notes.map((item, index) => (
            <Row>
                <li key={index}>{item.title}</li>
                <Button value={item._id} onClick={(e) =>this.viewNote(e)}>View Note</Button>
            </Row>
            )
        )
        if (this.state.viewNote === true){
            return(
                <div>
                    <h2>{this.state.noteInfo.title}</h2>
                    <p>{this.state.noteInfo.content}</p>
                </div>
            )
        } else {
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
}

export default NotesList;