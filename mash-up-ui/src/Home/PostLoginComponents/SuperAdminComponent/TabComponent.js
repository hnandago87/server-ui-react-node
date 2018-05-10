import React,{Component} from 'react'

class TabComponent extends Component{
    render(){
        const children = this.props.children;
        return(
        <div id="exTab1" className="container">	
            <ul  className="nav nav-pills">
                {this.props.table.forEach(function(value, index){
                     <li className={index == 0 ? "active" : ""}>
                        <a  href={value} data-toggle="tab">{value}</a>
                    </li>
                    })
                }
            </ul>
            <div className="tab-content clearfix">
                {React.Children.map(children, (child, i) => {
                    return (
                    <div className={i==0?"tab-pane active":"tab-pane"} id={value}>
                        child
                    </div>
                    )}
                )}
            </div>
        </div>
        )
    }
}