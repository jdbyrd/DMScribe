import React, { Component } from 'react';
import $ from 'jquery';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {selectTab, setUser, fetchGroups} from '../../actions/index';

const remote = 'https://png.icons8.com/ultraviolet/540/icosahedron.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login (event) {
    event.preventDefault();
    var user = $(event.target).serializeArray();
    var userObj = {
      username: user[0].value,
      password: user[1].value
    }
    if (userObj.username === '') {
      alert('Enter your username');
    } else if (userObj.password === '') {
      alert('Enter your password');
    } else {
      $.post('/login', userObj)
      .then((res) => {
        this.props.setUser(userObj.username);
        this.props.selectTab('Arena');
        this.props.fetchGroups(userObj.username);
      })
      .catch((res) => { // BUG: catch runs on every call
        if (res.status === 401) {
          alert('Could not find username')
        } else if (res.status === 402) {
          alert('Could not find password')
        } else if (res.status === 500) {
          alert('Server error')
        }
        $('#username').val('');
        $('#loginPassword').val('');
      })      
    }
  }

  render() {
    const resizeMode = 'center';
    if (this.props.currentTab !== 'Login') {
      return null;
    }

    return (
        <div>
          <img src="https://i.imgur.com/f60kcjD.jpg" id="bg" alt=""/>
          <Menu fixed='top' size='large' className='theme-background'>
            <Container>
              <Menu.Menu position='right'>
                <Menu.Item className='item'>
                  <Button
                  className="theme-text"
                  onClick={() => {this.props.selectTab('Landing')}}
                  as='a'
                  primary>Back to landing page</Button>
                </Menu.Item>
                <Menu.Item className='item'>
                  <Button
                  className="theme-text"
                  onClick={() => {this.props.selectTab('Login')}}
                  as='a'
                  primary>Log in</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button 
                  className="theme-text"
                  onClick={() => {this.props.selectTab('Signup')}}
                  as='a' 
                  primary>Sign Up</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button 
                  className="theme-text"
                  onClick={() => {this.props.selectTab('ForgotPW')}}
                  as='a' 
                  primary>Forgot password?</Button>
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
          <Grid centered columns={5}>
            <Grid.Column className="theme-text">
              <form className="ui form signupForm" onSubmit={(event) => {this.login(event)}}>
                <div className="field">
                  <label>Username:</label>
                  <input name="username" id='username' placeholder="enter username"/>
                </div>
                <div className="field">
                  <label>Password:</label>
                  <input type="password" name="password" id='loginPassword' placeholder="enter password"/>
                </div>
                <Button className="ui button theme-text" type="submit">Login!</Button>
              </form>
            </Grid.Column>
          </Grid>
        </div>
      )
  }
}

function mapStateToProps (state) {
  return {
    currentTab: state.currentTab
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectTab: selectTab,
    setUser: setUser,
    fetchGroups: fetchGroups
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
