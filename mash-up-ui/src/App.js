import React, { Component } from 'react';
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PrivateRoute from './Helpers/PrivateRoute'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import LayoutComponent from './reusable_components/LayoutComponent';
import HomeComponent from './Home/HomeComponent'
import BlogComponent from './Blog/BlogComponent'
import SharingComponent from './Sharing/SharingComponent'
import MediaComponent from './Media/MediaComponent'
import RandomizeComponent from './Randomize/RandomizeComponent'
import ResetCredentialsComponent from './reusable_components/resetCredentialsComponent'
class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    console.log(this.props)
    return (
      <div className="App">
      <LayoutComponent>
          <BrowserRouter>
            <div>
                <Route exact path='/' render={()=> <HomeComponent isAuthenticated={this.props.isAuthenticated}/>}/>
                <Route path='/reset' component={ResetCredentialsComponent} />
                <PrivateRoute path='/blog' component={BlogComponent} isAuthenticated={this.props.isAuthenticated} />
                <PrivateRoute path='/share'component={SharingComponent} isAuthenticated={this.props.isAuthenticated} />
                <PrivateRoute path='/media' component={MediaComponent} isAuthenticated={this.props.isAuthenticated} />
                <PrivateRoute path='/randomize' component={RandomizeComponent} isAuthenticated={this.props.isAuthenticated} />
            </div>
          </BrowserRouter>
        </LayoutComponent>
      </div>
    );
  }
}
function mapStateToProps(state){
  console.log(state);
  return{
    isAuthenticated:state.login.authenticated
  }
}
export default connect(mapStateToProps)(App);
