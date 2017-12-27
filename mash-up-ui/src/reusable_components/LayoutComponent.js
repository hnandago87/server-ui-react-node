import React, {Component} from 'react';
import HeaderComponent from './header';
import FooterComponent from './footer';
 class LayoutComponent extends Component{
     render(){
         return(
             <div>
                <HeaderComponent />
                    {this.props.children}
                <FooterComponent />
            </div>
         )
         
     }
 }

 export default LayoutComponent