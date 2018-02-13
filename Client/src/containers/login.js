import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onLogin } from '../actions/index';
// import { Recapture } from '../components/recaptcha';
import Alert from 'react-s-alert';
import { Link } from 'react-router-dom';

import Recaptcha from 'react-grecaptcha';

// const verifyCallback = response => console.log(response);
// const expiredCallback = () => {...};


class LoginPage extends Component{
  constructor(props) {
    super(props)
    this.state={
      username:'',
      password:'',
      recapture:''
    };

    this.RECAPTCHA_SITE_KEY = '6LfG8UUUAAAAAJUcdwceqMq8On7hECEiTy2A1y6L';
    this.onChangeUsername  = this.onChangeUsername.bind(this);
    this.onChangePassword  = this.onChangePassword.bind(this);
    this.verifyCallback    = this.verifyCallback.bind(this);
    this.expiredCallback   = this.expiredCallback.bind(this);
    this.LoginHandler      = this.LoginHandler.bind(this);
  }
  onChangeUsername(event){
    this.setState({username:event.target.value});
  }
  onChangePassword(event){
    this.setState({password:event.target.value});
  }
  LoginHandler(event){
    event.preventDefault();
    if (this.state.username == '' || this.state.password == ''){
      Alert.error('All fields are required', {
          position: 'top'
      });
      return;
    }
    if (this.state.recapture) {
      this.setState({
        username:'',
        password:'',
        recapture:''
      });
      this.props.onLogin(this.state.username,this.state.password);
      }else{
      Alert.error('Press on before ReCapture', { position: 'top' });
    }
  }
  verifyCallback(event){
    this.setState({recapture:true});
  }
  expiredCallback(event){
    this.setState({recapture:false});
  }
  render(){
    return(
        <div className="div-login col-sm-5">
          <div>
            <h2>Login</h2>
          </div>
          <form className="input-group-center" onSubmit={this.LoginHandler}>
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
                required
                pattern = '.{6,}'
                autoCapitalize='off'
                spellCheck='false' />
            </div>
            <div>
              <label htmlFor='password'>
                Password
              </label>
              <input
                className="form-control"
                id='password'
                type='password'
                value={this.state.password}
                placeholder='••••••••••'
                required
                pattern = '.{6,}'
                onChange={this.onChangePassword}
              />
            </div>
            <div className="row">
              <button className="btn btn-primary col-sm-4 login-button">Login</button>
              <Link to="/Register" className="btn btn-primary col-sm-4 login-button">Register</Link>
            </div>
          </form>
          <div className="center">
            <Recaptcha
              sitekey={this.RECAPTCHA_SITE_KEY}
              placeholder=''
              locale='en'
              className="center"
              callback={this.verifyCallback}
              expiredCallback={this.expiredCallback}
            />
          </div>
        </div>
    )
  }
}
// bind to redux action creator
function mapDispatchToProps(dispatch){
  return bindActionCreators({ onLogin },dispatch);
}

function mapStateToProps(state){
  return {sessionLogin:state.sessionLogin};
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);
