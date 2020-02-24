import React, {Component} from 'react';

import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from '../pages/login';
import Signup from '../pages/signup';
import Profile from '../pages/profile';
import Feed from '../pages/feed';

export default class Routes extends Component {
  render(){
    return(
    <Router>
        <Scene>
            <Scene key="root" hideNavBar={true} initial={!this.props.isLoggedIn} >
                <Scene key="login" component={Login}  title="Login"/>
                <Scene key="signup" component={Signup} title="Register"  initial={true} />
            </Scene>
            <Scene key="app" hideNavBar={true} initial={this.props.isLoggedIn}>
                <Scene key="feed" component={Feed} title="Feed"/>
                <Scene key="profile" component={Profile} title="Profile" initial={this.props.isLoggedIn}/>
            </Scene>
        </Scene>
    </Router>
    )
  }

}




