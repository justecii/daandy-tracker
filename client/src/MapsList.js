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

class MapsList extends Component{
    constructor(props){
        super(props)
        this.state={
            maps: [],
            title: '',
            image: ''
        }
        this.componentDidMount =this.componentDidMount.bind(this)
    }

    componentDidMount(){
        var campaignId = this.props.campaign._id;
        console.log(campaignId)
        axios.post('/users/maps', {
            campaign: campaignId,
            user: this.props.user
        }).then(result => {
            this.setState({ maps: result.data })
            console.log(this.state.maps)
        })
    }
    titleSubmit(e){
        var set = e.target.value;
        this.setState({
            title: set
        });
    }
    imageSubmit(e) {
        var set = e.target.value;
        this.setState({
            image: set
        });
    }
    onClick(e){
        e.preventDefault();
        axios.post('/users/maps/new', {
            title: this.state.title,
            image: this.state.image,
            campaign: this.props.campaign._id
        })
    }

    render(){
        return(
            <div>
                <form>
                    <Input label='Title' onInput={(e) => this.titleSubmit(e)}/>
                    <Input label='Upload Image' onInput={(e) => this.imageSubmit(e)} />
                    <Button onClick={(e) => this.onClick(e)}>New Map</Button>
                </form>
            </div>
        )
    }
}

export default MapsList;