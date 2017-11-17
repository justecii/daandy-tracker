import React, {Component} from 'react';
import axios from 'axios';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state={
            campaign: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount(){

        axios.post('users/profile', {
            user: this.props.user.id
        }).then(result=> {
            console.log(result.data)
            this.setState({
                campaign: result.data
            })
        })
    }
    render(){
        return(
            <div>
                <div className="left">
                    <h3>Welcome to your personal profile {this.props.user.name}</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td className="bold">Email:</td>
                                <td>{this.props.user.email}</td>
                            </tr>
                            <tr>
                                <td className="bold">Active Campaigns:</td>
                                <td>{this.state.campaign.length}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>Go to My Campaigns to see more details</p>
                </div>
                
            </div>
        )
    }
}

export default Profile;