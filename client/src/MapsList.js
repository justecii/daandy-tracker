import React, {Component} from 'react';
import { Input, Button, Row , Col} from 'react-materialize';
import axios from 'axios';

class MapsList extends Component{
    constructor(props){
        super(props)
        this.state={
            maps: [],
            title: '',
            image: '',
            viewMap: false
        }
        this.componentDidMount =this.componentDidMount.bind(this)
    }

    componentDidMount(){
        var campaignId = this.props.campaign._id;
        axios.post('/users/maps', {
            campaign: campaignId,
            user: this.props.user
        }).then(result => {
            this.setState({ maps: result.data })
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
        }).then(
            axios.post('/users/maps', {
                campaign: this.props.campaign._id,
                user: this.props.user
            }).then(result => {
                this.setState({ maps: result.data })
            })
        )
    }
    viewMap(e) {
        axios.post('/users/map/:id', {
            id: e.target.value
        }).then(result => {
            console.log(result.data[0])
            this.setState({
                mapInfo: result.data[0],
                viewMap: true
            })
        })
    }

    render(){
        let mappedMaps = this.state.maps.map((item, index) => (
            <Row>
                <li className="listItem" key={index}>{item.title}</li>
                <Button className="listItem" value={item._id} onClick={(e) => this.viewMap(e)}>View</Button>
            </Row>
        ) 
    )
    if (this.state.viewMap === true){
        return(
            <div>
                <h2>{this.state.mapInfo.title}</h2>
                <img className="fitImage" src={this.state.mapInfo.image} alt="Maps rendered" />
            </div>
        )
    } else {
        return(
            <div>
                <Row>
                    <Col s={12} m={4}>
                        {mappedMaps}
                    </Col>
                    <Col s={12} m={8}>
                        <form>
                            <Input className="myInput" label='Title' onInput={(e) => this.titleSubmit(e)}/>
                            <Input className="myInput" label='Upload Image' onInput={(e) => this.imageSubmit(e)} />
                            <Button onClick={(e) => this.onClick(e)}>Save Map</Button>
                        </form>
                    </Col>
                </Row>
            </div>
        )
    }
    }
}

export default MapsList;