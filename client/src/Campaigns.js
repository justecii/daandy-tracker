import React, {Component} from 'react';
import CurrentCamp from './CurrentCamp';
import { Button, Row } from "react-materialize";
import axios from 'axios';

class Campaigns extends Component {
    constructor(props){
        super(props)
        this.state ={
            campaigns: [],
            showCampaign: [],
            show: true
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
        var camp = e.target.value;
        axios.post('/users/list', {
            id: camp
        }).then(result => {
            this.setState({
                showCampaign: result.data[0],
                show: false
            })
        })
    }
    

    render(){
        let mappedCamp = this.state.campaigns.map((item, index) => (
            <Row>
                <Button key={index} onClick={(e) => this.onClick(e)} value={item._id}>{item.title}</Button>
            </Row>
        )
        );
        if (this.state.show){
            return(
            <div>
               {mappedCamp}
            </div>
        )
        } else {
            console.log(this.props)
            return(
                <div>
                    <CurrentCamp campaign={this.state.showCampaign}/>
                </div>
            )
        }
        
    }
}

export default Campaigns;