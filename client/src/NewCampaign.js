import React, {Component} from 'react';
import axios from 'axios';
import {Input, Button, Row, option} from 'react-materialize';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class NewCampaign extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            userList:[],
            user: this.props.user
        }
        this.componentDidMount=this.componentDidMount.bind(this)
    }
    componentDidMount() {
        axios.get('/users')
            .then(result => {
                this.setState({userList: result.data})
                console.log(this.state.userList)
                console.log(this.state.userList[0].email)
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
        console.log(this.state)
        console.log(this.props)
        axios.post('/users/campaign/new', {
            title: this.state.title,
            user: this.state.user
        })
    }
    
    render(){
        let mappedUsers = this.state.userList.map((item, index) => (
            <Row>
                <li key={index}>{item.email}</li>
            </Row>
        ))
        return(
            <div className="newForm">
                <div>
                    {mappedUsers}
                </div>
                <form>
                    <Input label="Title" onInput={ (e) => this.onSubmit(e)} />
                    <Input s={12} type='select' label="Materialize Select" defaultValue='2'>
                        <option value='1'>Option 1</option>
                        <option value='2'>Option 2</option>
                        <option value='3'>Option 3</option>
                    </Input>
                    <Button onClick={ (e) => this.onClick(e) }>Start Campaign</Button>
                </form>
            </div>
        )
    }
}

export default NewCampaign;