import React, { Component } from 'react';
import axios from 'axios';
import {Input, Button} from 'react-materialize';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';

class CharacterList extends Component {
    constructor(props){
        super(props)
        this.state ={
            name: '',
            image: '',
            race: '',
            charClass: '',
            align: '',
            level: '',
            characters: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount(){
        var campaignId = this.props.campaign._id;
        console.log(this.props)
        console.log(campaignId)
        axios.post('/users/chars', {
            campaign: campaignId,
            user: this.props.user
        }).then(result => {
            this.setState({characters: result.data})
            console.log(this.state.characters)
        })
    }
    nameSubmit(e){
        var set = e.target.value;
        this.setState({
            name: set
        });
    }
    raceSubmit(e) {
        var set = e.target.value;
        this.setState({
            race: set
        });
    }
    classSubmit(e) {
        var set = e.target.value;
        this.setState({
            charClass: set
        });
    }
    alignSubmit(e) {
        var set = e.target.value;
        this.setState({
            align: set
        });
    }
    levelSubmit(e) {
        var set = e.target.value;
        this.setState({
            level: set
        });
    }
    imageSubmit(e){
        var set = e.target.value;
        this.setState({
            image: set
        })
    }
    onClick(e){
        e.preventDefault();
        console.log(this.state)
        console.log(this.props.campaign._id)
        axios.post('/users/chars/new', {
            name: this.state.name,
            race: this.state.race,
            charClass: this.state.charClass,
            align: this.state.align,
            level: this.state.level,
            campaign: this.props.campaign._id
        })
    }
    render() {
        return (
            <div>

                <form>
                    <Input label="Name" onInput={(e) => this.nameSubmit(e)} />
                    <Input label="Race" onInput={(e) => this.raceSubmit(e)} />
                    <Input label="Class" onInput={(e) => this.classSubmit(e)} />
                    <Input label="Alignment" onInput={(e) => this.alignSubmit(e)} />
                    <Input label="Level" onInput={(e) => this.levelSubmit(e)} />
                    <Input label="Image URL" onInput={(e) => this.imageSubmit(e)} />
                    <Button onClick={(e) => this.onClick(e)}>Upload Character</Button>
                </form>
            </div>
        )
    }
}

export default CharacterList;