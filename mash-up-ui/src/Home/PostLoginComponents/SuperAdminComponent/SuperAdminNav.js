import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userPermission} from '../../../Actions/SuperAdmin/UserPermission';
import {getAllProjects} from '../../../Actions/SuperAdmin/UserPermission';

class SuperAdminNav extends Component{
    componentDidMount(){
        this.props.getPermission();
        this.props.getProjects();
    }
    render(){
        <div className="row">
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <h3 className="text-mute text-center">Manage User/Projects here</h3>
            </div>
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
              <TabComponent title={["users, projects"]} Userdata={this.props.users} ProjectsData={this.props.projects} >
                <TableComponent title="users" data={this.props.users} header={["E-Mail","Company","Page Name",["Permissions"] ]} />
                <TableComponent title="projects" data={this.props.projects} />
              </TabComponent>
            </div>
        </div>
    }
}
function mapStateToProps(state){
    return{
        users:state.users,
        projects:state.projects
    }
}
function mapDispatchToProps(dispatch){
    return{
        getPermission:()=>{dispatch(userPermission())},
        getProjects:()=>{dispatch(getAllProjects())}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminNav);