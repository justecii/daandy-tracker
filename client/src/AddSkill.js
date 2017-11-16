import React, {Component} from 'react';
import {Button, Input} from 'react-materialize';
import axios from 'axios';

class AddSkill extends Component {
    constructor(props){
        super(props)
        this.state={
            spell: ''
        }
    }
    searchSpells(e){
        var set = e.target.value;
        this.setState({
            spell: set
        })
    }
    onClick(e){
        e.preventDefault();
        axios.post('/ability/search', {
            search: this.state.spell
        }).then(result =>{
            console.log(result)
        })
    }
    render(){
        return(
            <div>
                Skills will be here
                <form>
                    <Input label='Search Spells' onInput={(e) =>this.searchSpells(e)} />
                    <Button onClick={(e) =>this.onClick(e)}>Submit</Button>
                </form>
            </div>
        )
    }
}

export default AddSkill;