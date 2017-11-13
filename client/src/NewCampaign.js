import React, {Component} from 'react';
import axios from 'axios';
import {Input, Button} from 'react-materialize';

class NewCampaign extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            user: this.props.user
        }
    }
    onSubmit(e){
        var setTitle = e.target.value;
        this.setState({
            title: setTitle
        })
    }

    onClick(e){
        e.preventDefault();
        console.log(this.state)
        console.log(this.props)
        axios.post('/users/campaign/new', {
            title: this.state.title,
            user: this.state.user
        })
    }
    render(){
        return(
            <div className="newForm">
                <form>
                    <Input label="Title" onInput={ (e) => this.onSubmit(e)} />
                    <Button onClick={ (e) => this.onClick(e) }>Start Campaign</Button>
                </form>
            </div>
        )
    }
}

export default NewCampaign;