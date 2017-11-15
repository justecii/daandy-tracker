import React, {Component} from 'react';
import axios from 'axios';
import Select from 'react-select';
import {Button} from 'react-materialize'
import 'react-select/dist/react-select.css';
// import { Input, Button, Row } from 'react-materialize';

class UserList extends Component {
    constructor(props){
        super(props)
        this.state={
            user: this.props.user,
            userList: [],
            campUsers: [],
            disabled: false,
            searchable: this.props.searchable,
            selectValue: '',
            clearable: true,
            rtl: false,
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount() {
        axios.get('/users')
            .then(result => {
                this.setState({ userList: result.data })
            })
        var campaignId = this.props.campaign._id;
        axios.post('/users/active', {
            campaign: campaignId
        }).then(result => {
            console.log(result.data)
            // this.setState({ campUsers: result.data })
        })
    }

    //props for user dropdown
    updateValue(newValue) {
        this.setState({
            selectValue: newValue,
        })
    }
    //add user to campaign list
    onClick(e){
        e.preventDefault();
        axios.post('/users/campaign/user', {
            user: this.state.selectValue,
            campaign: this.props.campaign._id
        })
    }
    render(){
        let mappedOptions = this.state.userList.map((item, index) => (
            { value: item.id, label: item.email }
        ))
        return(
            <div>
                <Select
                    id="state-select"
                    ref="stateSelect"
                    autoFocus
                    options={mappedOptions}
                    simpleValue
                    clearable={this.state.clearable}
                    name="selected-state"
                    disabled={this.state.disabled}
                    value={this.state.selectValue}
                    onChange={(e) => this.updateValue(e)}
                    rtl={this.state.rtl}
                    searchable={this.state.searchable}
                />
                <Button onClick={(e) => this.onClick(e)}>Add User</Button>
            </div>
        )
    }
}

export default UserList;