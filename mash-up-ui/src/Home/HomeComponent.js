import React, {Component} from 'react'
import { connect } from 'react-redux';
import HomeContainerComponent from './HomeContainerComponent';
import HomeContainerComponentNonAuthorized from './HomeContainerComponentNonAuthorized'
class HomeComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props)
        return(
            <div className="container-fluid">
                {this.props.isAuthenticated? <HomeContainerComponent /> : <HomeContainerComponentNonAuthorized />}
            </div>
        )
    }
}

export default HomeComponent