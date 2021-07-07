import React, { Component } from "react";
//import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header'
import Footer from './components/Footer'
import RegisterForm from './components/RegisterForm'
// import { purple } from '@material-ui/core/colors';
// import Button from '@material-ui/core/Button';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//       },
//     },
//     background: {
//         backgroundColor: '#00b0ff'
//     }
// }));

class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
        //const classes = useStyles();
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <React.StrictMode>
                <Header />
                <br /> 
                <RegisterForm />
                <br />
                <Footer position="absolute" />
            </React.StrictMode>    
        );
    }
}

export default Register;