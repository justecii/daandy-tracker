import React, {Component} from 'react';
import {Button, Input, Row, Col} from 'react-materialize';
import axios from 'axios';
import Select from 'react-select';

class AddSkill extends Component {
    constructor(props){
        super(props)
        this.state={
            spell: [],
            spellList: [],
            spellDesc: [],
            spellClass: [],
            spellUrl: [],
            type: '',
            disabled: false,
            searchable: this.props.searchable,
            selectValue: '',
            clearable: true,
            rtl: false
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount(){
        axios.post('/ability/spells')
        .then(result=> {
            this.setState({
                spellList: result.data.results
            })
            console.log(this.props.char)
        })
    }

    onClick(e){
        e.preventDefault();
        axios.post('/ability/spell/search', {
            search: this.state.selectValue
        }).then(result =>{
            this.setState({
                spell: result.data,
                spellName: result.data.name,
                spellDesc: result.data.desc,
                spellClass: result.data.classes,
                spellUrl: result.data.url
            })
            console.log(this.state.spell)
        })
    }
    addSpell(e){
        e.preventDefault();
        axios.post('/ability/spell/add', {
            spellId: this.state.spellUrl,
            name: this.state.spellName,
            ability: this.state.type,
            character: this.props.char._id
        })
    }
    //props for spells dropdown
    updateValue(newValue) {
        this.setState({
            selectValue: newValue,
        })
    }
    render(){
        let mappedSpells = this.state.spellList.map((item, index) => (
            { value: item.url, label: item.name }
        ))
        let mappedDesc = this.state.spellDesc.map((item, index) => (
            <tr>
                <td>Description {index + 1}</td>
                <td>{item}</td>
            </tr>
        ))
        let mappedClass = this.state.spellClass.map((item, index) => (
            <tr>
                <td>Class {index + 1}</td>
                <td>{item.name}</td>
            </tr>
        ))
        return(
            <div>
                <Row>
                    <Col s={12}>
                        <form>
                            <Row>
                                <Col s={12} m={8}>
                                    <Select
                                        id="state-select"
                                        ref="stateSelect"
                                        autoFocus
                                        options={mappedSpells}
                                        simpleValue
                                        clearable={this.state.clearable}
                                        name="selected-state"
                                        disabled={this.state.disabled}
                                        value={this.state.selectValue}
                                        onChange={(e) => this.updateValue(e)}
                                        rtl={this.state.rtl}
                                        searchable={this.state.searchable}
                                    />
                                </Col>
                                <Col s={12} m={4}>
                                    <Button onClick={(e) =>this.onClick(e)}>View Spell</Button>
                                </Col>
                            </Row>
                        </form>
                        <table>
                            <thead>
                                <tr>
                                    <th>Spell Name</th>
                                    <th>{this.state.spell.name}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Level</td>
                                    <td>{this.state.spell.level}</td>
                                </tr>
                                {mappedDesc}
                                {mappedClass}
                            </tbody>
                        </table>
                        <Button onClick={(e) => this.addSpell(e)}>Add Spell</Button>
                        
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AddSkill;