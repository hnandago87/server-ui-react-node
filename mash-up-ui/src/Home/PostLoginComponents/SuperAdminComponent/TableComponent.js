import React, {Component} from 'react'

class TableComponent extends Component{

    render(){
        let checkboxOptions=["R", "W", "D","C"];
        return (
            <div className="tab-pane" id={this.props.id}>
                <div class="panel panel-default panel-table">
                    <div class="panel-heading">
                        <div class="row">
                        <div class="col col-xs-6">
                            <h3 class="panel-title">Panel Heading</h3>
                        </div>
                        <div class="col col-xs-6 text-right">
                            <button type="button" class="btn btn-sm btn-primary btn-create">Create New</button>
                        </div>
                        </div>
                    </div>
                    <div class="panel-body">
                        <table class="table table-striped table-bordered table-list">
                            <thead>
                                <tr>
                                    <th><em class="fa fa-cog"></em></th>
                                    <th class="hidden-xs">ID</th>
                                    {this.props.headers.forEach(function(val){
                                            Array.isArray(val)?
                                            (
                                                <span>
                                                <th colSpan={4}>{val}</th><th rowSpan={1}>checkboxOptions[0]</th>
                                                <th rowSpan={1}>checkboxOptions[1]</th><th rowSpan={1}>checkboxOptions[2]</th>
                                                <th rowSpan={1}>checkboxOptions[3]</th>
                                            </span>
                                            )
                                            :
                                            <th>{val}</th>
                                        })
                                    }
                                </tr> 
                            </thead>
                            <tbody>
                                {this.props.data.forEach(function(val){
                                        <tr>
                                            <td align="center">
                                            <a class="btn btn-default"><em class="fa fa-pencil"></em></a>
                                            <a class="btn btn-danger"><em class="fa fa-trash"></em></a>
                                            </td>
                                            <td class="hidden-xs">1</td>
                                            {Object.keys(val).forEach(function(key){
                                                    Array.isArray(val[key])?
                                                       checkboxOptions.forEach(function(subVal, index){
                                                            <td>
                                                                <input type="checkbox" defaultChecked={val[key].incudes(subVal)} 
                                                                ref={val.pageName + checkboxOptions[index]} />
                                                            </td>
                                                        })
                                                    :
                                                    <td>{val[key]}</td>
                                                })
                                            }
                                        </tr>
                                    })
                                }
                                
                            </tbody>
                        </table>
                    
                    </div>
                    <div class="panel-footer">
                        <div class="row">
                        <div class="col col-xs-4">Page 1 of 5
                        </div>
                        <div class="col col-xs-8">
                            <ul class="pagination hidden-xs pull-right">
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            </ul>
                            <ul class="pagination visible-xs pull-right">
                                <li><a href="#">«</a></li>
                                <li><a href="#">»</a></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}