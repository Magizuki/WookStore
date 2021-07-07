import React, { Component } from "react";
//import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'

class Login extends Component {
    
    // constructor(props) {
    //     super(props);
    //     //this.state = { apiResponse: "" };
    //     //const classes = useStyles();
    // }

    render() {
        return (
            <React.StrictMode>
                <Header />
                <br /> 
                <LoginForm />
                <br />
                <Footer position="absolute" />
            </React.StrictMode>    
        );
    }
}

export default Login;