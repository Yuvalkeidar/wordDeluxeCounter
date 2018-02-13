import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onRegister } from '../actions/index';
import Alert from 'react-s-alert';
import { Link } from 'react-router-dom';

class RegisterPage extends Component{
  constructor(props) {
    super(props)

    this.state={
      username:'',
      password1:'',
      password2:''
    };

    this.onChangeUsername  = this.onChangeUsername.bind(this);
    this.onChangePassword1 = this.onChangePassword1.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.registerHandler   = this.registerHandler.bind(this);

  }
  onChangeUsername(event){
    this.setState({username:event.target.value});
  }
  onChangePassword1(event){
    this.setState({password1:event.target.value});
  }
  onChangePassword2(event){
    this.setState({password2:event.target.value});
  }
  registerHandler(event){
    event.preventDefault();
    if (this.state.password1 === this.state.password2) {
      this.props.onRegister(this.state.username,this.state.password1);
    }else{
      Alert.error('The Passwords Doesnt Match', {
          position: 'top'
      });
      this.setState({
        username:'',
        password1:'',
        password2:''
      });
    }
  }
  render(){
    return(
        <div className="div-login col-sm-4">
          <div>
            <h2>Register</h2>
          </div>
          <form className="input-group-center" onSubmit={this.registerHandler}>
            <div>
              <label htmlFor='username'>
                Username
              </label>
              <input
                className="form-control"
                type='text'
                id='username'
                value={this.state.username}
                placeholder='Enter User Name'
                onChange={this.onChangeUsername}
                autoCorrect='off'
                autoCapitalize='off'
                required
                pattern = '.{6,}'
                spellCheck='false' />
            </div>
            <div>
              <label htmlFor='password1'>
                Password
              </label>
              <input
                className="form-control"
                id='password1'
                type='password'
                value={this.state.password1}
                placeholder='••••••••••'
                required
                pattern = '.{6,}'
                onChange={this.onChangePassword1}
              />
            </div>
            <div>
              <label htmlFor='password2'>
                Renter Password
              </label>
              <input
                className="form-control"
                id='password2'
                type='password'
                value={this.state.password2}
                placeholder='••••••••••'
                pattern = '.{6,}'
                required
                onChange={this.onChangePassword2}
              />
            </div>
            <div className="row">
              <button className="btn btn-primary col-sm-4 login-button">Register</button>
              <Link to="/" className="btn btn-primary col-sm-4 login-button">Sign up</Link>
            </div>
          </form>
        </div>
    )
  }
}
// bind to redux action creator
function mapDispatchToProps(dispatch){
  return bindActionCreators({ onRegister },dispatch);
}

function mapStateToProps(state){
  return {sessionLogin:state.sessionLogin};
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterPage);
