import React, { Component } from 'react';
import axios from 'axios';
import {Button, Input} from 'react-materialize';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      localStorage.setItem('mernToken', result.data.token)
      this.props.lift(result.data)
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input label="email" type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
        <Input type="password" label="password" value={this.state.password} onChange={this.handlePasswordChange} /><br />
        <Button className="fltLeft" type='submit'>Login</Button>
      </form>
    );
  }
}

export default Login;
