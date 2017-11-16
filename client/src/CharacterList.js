import React, { Component } from 'react';
import AddSkill from './AddSkill';
import axios from 'axios';
import {Input, Button, Row, Col} from 'react-materialize';
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
            characters: [],
            viewChar: false
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
        axios.post('/users/characters/add', {
            name: this.state.name,
            race: this.state.race,
            charClass: this.state.charClass,
            align: this.state.align,
            level: this.state.level,
            image: this.state.image,
            campaign: this.props.campaign._id
        })
    }

    viewChar(e) {
        axios.post('/users/chars/:id', {
            id: e.target.value
        }).then(result => {
            console.log(result.data[0])
            this.setState({
                charInfo: result.data[0],
                viewChar: true
            })
        })
    }
    render() {
        let mappedChars = this.state.characters.map((item, index) => (
            <Row>
                <li key={index}>{item.name}</li>
                <Button value={item._id} onClick={(e) => this.viewChar(e)}>View Character</Button>
            </Row>
        ) 
    )
    if (this.state.viewChar === true){
        return(
            <div>
                <h2>{this.state.charInfo.name}</h2>
                <h4>Level: {this.state.charInfo.level} / Class: {this.state.charInfo.class}</h4>
                <h4>Alignment: {this.state.charInfo.alignment} / Race: {this.state.charInfo.race}</h4>
                <img className="fitImage" src={this.state.charInfo.image} alt="Character Image"/>
                <Button>Update Character</Button>
                <br/>
                <AddSkill />
            </div>
        )
    } else {
        return (
            <div>
                <Row>
                    <Col s={12} m={4}>{mappedChars}</Col>
                    <Col s={12} m={8}>
                    <form>
                        <Input label="Name" onInput={(e) => this.nameSubmit(e)} />
                        <Input label="Race" onInput={(e) => this.raceSubmit(e)} />
                        <Input label="Class" onInput={(e) => this.classSubmit(e)} />
                        <Input label="Alignment" onInput={(e) => this.alignSubmit(e)} />
                        <Input label="Level" onInput={(e) => this.levelSubmit(e)} />
                        <Input label="Image URL" onInput={(e) => this.imageSubmit(e)} />
                        <Button onClick={(e) => this.onClick(e)}>Upload Character</Button>
                    </form>
                    </Col>
                </Row>
            </div>
        )
    }
    }
}

export default CharacterList;