import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getLogin,logOut} from '../Actions/LoginActions';
class HeaderComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            showLoinModal:"collapse nav navbar-nav nav-collapse slide-down",
            login:{
                email:"example@example.com",
                password:""
            },
            loggedIn:false
        }
        this.loginChange = this.loginChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.logOutUser = this.logOutUser.bind(this);
    }
    logOutUser(e){
        e.preventDefault();
        console.log(this.props)
        this.props.getSignedOut()
    }
    toggleLogin(){
        if(this.state.showLoinModal.split(" ").length < 6){
            this.setState({showLoinModal:"collapse nav navbar-nav nav-collapse slide-down in"})
        } else{
            this.setState({showLoinModal:"collapse nav navbar-nav nav-collapse slide-down"});
        }
    }
    loginChange(e){
        var obj = this.state.login;
        obj[e.target.name] = e.target.value;
        this.setState({login:obj})
    }
    submitLogin(e){
        e.preventDefault();
        this.props.getLogin(this.state.login);
        this.toggleLogin();
        var obj = this.state.login;
        obj["email"]='example@example.com';
        obj["password"]="";
        this.setState({login:obj});
    }
    componentDidMount(){
        console.log(this.props)
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        if(nextProps.user.loggedIn){
            console.log("Done")
            this.setState({loggedIn:nextProps.user.loggedIn})
        }
        if(!nextProps.user.loggedIn && this.state.loggedIn){
            this.setState({loggedIn:nextProps.user.loggedIn})
        }
    }
    render(){
        return(
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-2">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">Mash UP</a>
                    </div>
                
                    
                    <div className="collapse navbar-collapse" id="navbar-collapse-2">
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="/">Home</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/share">Share</a></li>
                        <li><a href="/media">Media</a></li>
                        <li><a href="/randomize">Randomize</a></li>
                        {this.props.user.loggedIn?
                            ( <li>
                                <a className="btn btn-primary" onClick={this.logOutUser}>Sign Out</a>
                            </li>)
                        :(
                            <li>
                                <a className="btn btn-primary btn-outline btn-circle collapsed" onClick={this.toggleLogin}>Sign in</a>
                            </li>
                        )}
                    </ul>
                    <div className={this.state.showLoinModal} id="nav-collapse2">
                        <form className="navbar-form navbar-right form-inline" role="form" ref="loginForm" onSubmit={this.submitLogin}>
                            <div className="form-group">
                                <label className="sr-only" htmlFor="Email">Email</label>
                                <input type="email" className="form-control" name="email" id="Email" placeholder="Email" onChange={this.loginChange} value={this.state.login.email} autoFocus required />
                            </div>
                            <div className="form-group">
                                <label className="sr-only" htmlFor="Password">Password</label>
                                <input type="password" className="form-control" name="password" id="Password" placeholder="Password" onChange={this.loginChange} value={this.state.login.password} required />
                            </div>
                            <button type="submit" className="btn btn-success">Sign in</button>
                            <button type="reset" className="btn btn-warning">Forgot credentials</button>
                        </form>
                    </div>
                    </div>
                </div>
            </nav>
        )
    }
}
function mapStateToProps(state){
    console.log(state);
    return {
        user:state.login
    }
}
function mapDispatchToProps(dispatch){
    return{
        getLogin:(data)=>{dispatch(getLogin(data))},
        getSignedOut:()=>{dispatch(logOut())}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HeaderComponent);
