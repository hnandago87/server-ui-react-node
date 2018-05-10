import React, {Component} from 'react'
import {connect} from 'react-redux';
class HomeNavComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            display:false
        };
    }
    componentWillReceiveProps(nextProps){
        console.log()
        this.setState({display:nextProps.control[Object.keys(nextProps.control)[0]].currentView=="admin" ? true:false})
    }
    render(){
        return(
            <div className="home-nav">
                <p><i>Navigate Home Page</i></p>
                <ul className="home-nav-list">
                    <li><a>New</a></li>
                    <li><a>Active</a></li>
                    <li><a>Pending</a></li>
                    <li><a>Stopped</a></li>
                    <li><a>Issues</a></li>
                </ul>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
       control:state.viewControl
    }
}
export default connect(mapStateToProps)(HomeNavComponent)