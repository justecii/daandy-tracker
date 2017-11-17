import React, {Component} from 'react';
import axios from 'axios';
import {Input, Button, Row} from 'react-materialize';


class NewCampaign extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            user: this.props.user
        }
    }
    componentDidMount() {
        axios.get('/users')
            .then(result => {
                this.setState({userList: result.data})
            })
    }
    onSubmit(e){
        var setTitle = e.target.value;
        this.setState({
            title: setTitle
        })
    }

    onClick(e){
        e.preventDefault();
        axios.post('/users/campaign/new', {
            title: this.state.title,
            user: this.state.user
        })
    }
    
    render(){
        return(
            <div className="newForm">
                <form>
                    <Input className="myInput" label="Title" onInput={ (e) => this.onSubmit(e)} />
                    <Button onClick={ (e) => this.onClick(e) }>Start Campaign</Button>
                </form>
            </div>
        )
    }
}

export default NewCampaign;