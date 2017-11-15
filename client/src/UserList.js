import React, {Component} from 'react';
import axios from 'axios';
import Select from 'react-select';
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
                console.log(this.state.userList)
                console.log(this.state.userList[0].email)
            })
        var campaignId = this.props.campaign._id;
        axios.post('/users/active', {
            campaign: campaignId
        }).then(result => {
            console.log(result.data)
            // this.setState({ campUsers: result.data })
        })
        console.log(this.props.campaign)
    }

    //props for user dropdown
    updateValue(newValue) {
        this.setState({
            selectValue: newValue,
        })
        console.log(this.state.selectValue)
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
            </div>
        )
    }
}

export default UserList;