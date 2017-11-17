import React, {Component} from 'react';
import { Input, Button, Row, Col } from 'react-materialize';
import axios from 'axios';


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
        }).then(
            axios.post('/users/notes', {
                campaign: this.props.campaign._id,
                user: this.props.user
            }).then(result => {
                this.setState({ notes: result.data })
            })
        )
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
                <li className="listItem" key={index}>{item.title}</li>
                <Button className="listItem" value={item._id} onClick={(e) =>this.viewNote(e)}>View</Button>
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
                    <Row>
                        <Col s={12} m={4}>
                            {mappedNotes}
                        </Col>
                        <Col s={12} m={8}>
                            <form>
                                <Input className="myInput" label='Title' onInput={(e) => this.titleSubmit(e)} />
                                <Input className="myInput" type="textarea" label='Note' onInput={(e) => this.contentSubmit(e)} />
                                <Button onClick={(e) => this.onClick(e)}>Save Note</Button>
                            </form>
                        </Col>
                    </Row>
                </div>
            )
        }
    }
}

export default NotesList;