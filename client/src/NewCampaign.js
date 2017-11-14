import React, {Component} from 'react';
import axios from 'axios';
import {Input, Button, Row, option} from 'react-materialize';

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
                    <select>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option selected value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                    <Button onClick={ (e) => this.onClick(e) }>Start Campaign</Button>
                </form>
            </div>
        )
    }
}

export default NewCampaign;