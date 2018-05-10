import React, {Component} from 'react';
class AdminComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            toggleView:false
        }
        this.toggleView = this.toggleView.bind(this);
    }
    toggleView(){
        this.setState({toggleView:!this.state.toggleView});
         this.props.changeView();
    }
    render(){
        return(
            <div>
                <div className="row inline-headers">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                        <h2 className="text-center text text-muted">Super Admin Component</h2>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <label className="checkbox">
                            <input type="checkbox" checked={this.state.toggleView} className="viewToggle" onClick={this.toggleView} value="Switch to subscribed view mode ?" data-toggle="toggle" /> 
                            View
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminComponent;