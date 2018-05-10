import React,{Component} from 'react';
import {connect} from 'react-redux';
import { RingLoader } from 'react-spinners';
import HomeNavComponent from './home-container/HomeNavComponent'
import ReportComponent from './home-container/ReportComponent'
import SubscribedUser from './PostLoginComponents/SubscribedUser';
import AdminComponent from './PostLoginComponents/AdminComponent';
import {addingView} from '../Actions/ViewControl/ViewControlActionCreators'
class HomeContainerComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            views:{admin:AdminComponent,subs:SubscribedUser},
            canView:false,
            viewType:''
        };
        this.renderFromApi = this.renderFromApi.bind(this);
        this.changeAdminView = this.changeAdminView.bind(this);
    }
    componentDidMount(){
        this.props.getAccessForPage('home')
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.viewControl.defaultView != ""){
            this.setState({canView:true});
            this.setState({viewType:'admin'});
        }
    }
    changeAdminView(){
        this.setState({viewType:'subs'});
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextState.canView?true:false;
    }
    renderFromApi(){
        if(this.state.viewType !==undefined && this.state.viewType !== ''){
            var NwComponent = this.state.views[this.state.viewType];
            return(<NwComponent changeView={this.changeAdminView} />);
        }
    }
    render(){
        return(
            <div className="row">
                <div className="col-lg-2">
                    <HomeNavComponent />
                </div>
                <div className="col-lg-8">
                    {this.state.canView ?
                        this.renderFromApi()
                         : 
                        <RingLoader color={'#123abc'} loading={!this.state.canView} />
                    }
                </div>
                <div className="col-lg-2"><ReportComponent /></div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        viewControl:state.viewControl.home
    }
}
function mapDispatchToProps(dispatch){
    return{
        getAccessForPage:(data)=>{dispatch(addingView(data))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainerComponent);