import React, { Component} from 'react';
class ResetCredentialsComponent extends Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="email" className="col-lg-3">Email address</label>
                            <div className="col-lg-9">
                                <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="confirmEmail" className="col-lg-3">Confirm Email</label>
                            <div className="col-lg-9">
                                <input type="email" className="form-control" id="confirmEmail" placeholder="name@example.com" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <button type="submit" className="btn btn-primary mb-2">Confirm identity</button>
                        </div>
                    </form>
                </div>    
            </div>
        )
    }
}
export default ResetCredentialsComponent;