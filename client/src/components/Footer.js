import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class Footer extends Component {

    render(){
        return(
            <nav id="bottomNavbar" className="navbar navbar-expand-lg" style={{bottom: '0px', width: '100%' ,position: this.props.position}}>
                <div className="container">
                    <span style={{margin: 'auto', display: 'block', color: 'white'}}>2018 WookStore Nusantara</span>
                </div>
            </nav>
        )
    }

}

export default Footer