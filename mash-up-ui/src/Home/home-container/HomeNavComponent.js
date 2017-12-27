import React, {Component} from 'react'
class HomeNavComponent extends Component{
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

export default HomeNavComponent