import React, { Component } from 'react';
import logo from './logo.svg';
import Toolbar from './components/Toolbar/Toolbar';
import Header from './components/Header/Header';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import cse from './components/Branches/BranchLink/cse/cse';
import electrical from './components/Branches/BranchLink/electrical/electrical';
import Form from './containers/Form/Form';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Admin from './components/Auth/Admin';
import Verification from './components/Auth/Verification';
import UsersForm from './components/Auth/UsersForm'
import { connect } from 'react-redux';
import * as actions from './store/actions/index'

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  
  render() {
    // let routes = (
    //   <Switch>
    //     <Route path="/" exact component={auth} />     
    //   </Switch>
    // );

    // if (this.props.isAuthenticated) {
    //   routes = (
    //     <Switch>
    //       <Route path="/logout" component={Logout} />
    //       <Route path="/cse" component={cse} />
    //       <Route path="/form" component={Form} />
    //       <Route path="/electrical" component={electrical} />
    //       <Route path="/" component={auth} />
    //       <Redirect to="/cse" />
    //       <Redirect to="/" />
    //     </Switch>
    //   );
    // }

    return (
      <div>
        <Route path='/' exact component={Header} />
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/adminlogin' exact component={Admin} />
        <Route path='/verification' exact component={Verification} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
