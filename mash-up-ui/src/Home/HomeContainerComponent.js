import React,{Component} from 'react';
import HomeNavComponent from './home-container/HomeNavComponent'
import ReportComponent from './home-container/ReportComponent'
class HomeContainerComponent extends Component{
    render(){
        return(
            <div className="row">
                <div className="col-lg-2">
                    <HomeNavComponent />
                </div>
                <div className="col-lg-8">Manage your projects</div>
                <div className="col-lg-2"><ReportComponent /></div>
            </div>
        )
    }
}

export default HomeContainerComponent;