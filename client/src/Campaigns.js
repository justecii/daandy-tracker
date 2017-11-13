import React, {Component} from 'react';
import CurrentCamp from './CurrentCamp';
import { Button, Row } from "react-materialize";
import axios from 'axios';

class Campaigns extends Component {
    constructor(props){
        super(props)
        this.state ={
            campaigns: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount(){
        axios.post('/users/campaign', {
            user: this.props.user.id
        }).then(result => {
            this.setState({campaigns: result.data})
            console.log(this.state.campaigns)
        })
    }
    onClick(e){
        e.preventDefault();
        var id = e.target.value;
        this.props.getCampaign(id)
    }

    render(){
        let mappedCamp = this.state.campaigns.map((item, index) => (
            <Row>
                <Button key={index} onClick={(e) => this.onClick(e)} value={item._id}>{item.title}</Button>
            </Row>
        )
        );
        return(
            <div>
               {mappedCamp}
            </div>
        )
    }
}

export default Campaigns;