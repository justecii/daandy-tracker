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
            charAbility: [],
            viewChar: false
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount(){
        var campaignId = this.props.campaign._id;
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
        }).then(
            axios.post('/users/chars', {
                campaign: this.props.campaign._id,
                user: this.props.user
            }).then(result => {
                this.setState({ characters: result.data })
            })
        )
    }

    viewChar(e) {
        axios.post('/users/chars/:id', {
            id: e.target.value
        }).then(result => {
            this.setState({
                charInfo: result.data[0],
                charAbility: result.data[0].abilities,
                viewChar: true
            })
        }) 
        console.log("ADOREE JACKSON")
        for(var i =0; i < this.state.charAbility.length; i++){
            console.log(this.state.charAbility[i])
        }
        
    }
    render() {
        let mappedChars = this.state.characters.map((item, index) => (
            <Row>
                <li className="listItem" key={index}>{item.name}</li>
                <Button className="listItem" key={index} value={item._id} onClick={(e) => this.viewChar(e)}>View</Button>
            </Row>
            ) 
        )
        let mappedSpells =this.state.charAbility.map((item, index) => (
            <tr>
                <td>Spell {index + 1}</td>
                <td>{item}</td>
            </tr>
        ))
    if (this.state.viewChar === true){
        return(
            <div>
                <Row>
                    <Col s={0} m={3}>
                        <img className="fitImage" src={this.state.charInfo.image} alt="Character Image" />
                    </Col>
                    <Col s={12} m={9}>
                        <h2 className="fltLeft">{this.state.charInfo.name}</h2>
                        <Button className="fltLeft updateChar">Update Character</Button>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="bold">Level:</td>
                                    <td>{this.state.charInfo.level}</td>
                                    <td className="bold">Class:</td>
                                    <td>{this.state.charInfo.class}</td>
                                </tr>
                                <tr>
                                    <td className="bold">Alignment</td>
                                    <td>{this.state.charInfo.alignment}</td>
                                    <td className="bold">Race</td>
                                    <td>{this.state.charInfo.race}</td>
                                </tr>
                                {mappedSpells}
                            </tbody>                            
                        </table>
                        
                    </Col>
                
                
                <br/>
                </Row>
                <AddSkill char={this.state.charInfo}/>
            </div>
        )
    } else {
        return (
            <div>
                <Row>
                    <Col s={12} m={4}>{mappedChars}</Col>
                    <Col s={12} m={8}>
                    <form>
                        <Input className="myInput" label="Name" onInput={(e) => this.nameSubmit(e)} />
                        <Input className="myInput" label="Race" onInput={(e) => this.raceSubmit(e)} />
                        <Input className="myInput" label="Class" onInput={(e) => this.classSubmit(e)} />
                        <Input className="myInput" label="Alignment" onInput={(e) => this.alignSubmit(e)} />
                        <Input className="myInput" label="Level" onInput={(e) => this.levelSubmit(e)} />
                        <Input className="myInput" label="Image URL" onInput={(e) => this.imageSubmit(e)} />
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