import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router";
import {
  Link
} from 'react-router-dom';

class User extends Component {

    constructor(){
        super()
        this.state = {
            redirect: ''
        }

    }

     componentDidMount(){
        // fetch("http://localhost:9000/users/userSession", {
        //     crossDomain: true,
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     }
        // })
        // .then(res => {
        //     if(res.body.username)
        //     {
        //         console.log(res)
        //         this.setState({username: "Hi" + res.body.username, id: res.body.id})
        //     }
        // })

        if(localStorage.getItem('username'))
        {
            this.setState({username: "Hi " + localStorage.getItem('username'), id: localStorage.getItem('id')})
        }

    }

    logout = () => {
        localStorage.clear()

        console.log("session sudah dihapus : " + sessionStorage.getItem("username"))

         fetch("http://localhost:9000/users/deleteuserSession", {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        
        this.setState({redirect: '/Login'})
    }

    render(){

        if(this.state.redirect)
        {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand ms-3" style={{color: "white"}}>Cart</Link>
                <label className="navbar-brand ms-3" onClick={this.logout} style={{color: "white", cursor: "pointer"}}>Logout</label>
            </React.Fragment>
        )
    }

}

class Guest extends Component {

    render(){
        return(
            <React.Fragment>
                <Link to="/Login" className="navbar-brand ms-3" style={{color: "white"}}>Login</Link>
                <Link to="/Register" className="navbar-brand ms-3" style={{color: "white"}}>Register</Link>
            </React.Fragment>
        )
    }

}

class Header extends Component {

    constructor(){
        super()
        this.state = {
            username: '',
            id: '',
            redirect: '',
            user: <User />,
            guest: <Guest />,
            userLogged: ''
        }
    }


    // RoleChecking = () => {
    //     console.log(this.state)
    //     console.log(localStorage.getItem('username'))
    //     if(localStorage.getItem('username'))
    //     {
    //         this.setState({userLogged: this.state.user})
    //     }
    //     else
    //     {
    //         this.setState({userLogged: this.state.guest})
    //     }
 
    // } 

    componentDidMount(){
        // fetch("http://localhost:9000/users/userSession", {
        //     crossDomain: true,
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     }
        // })
        // .then(res => {
        //     if(res.body.username)
        //     {
        //         console.log(res)
        //         this.setState({username: "Hi" + res.body.username, id: res.body.id})
        //     }
        // })

        console.log(localStorage.getItem('username'))
        if(localStorage.getItem('username') !== null)
        {
            console.log("username")
            this.setState({username: "Hi " + localStorage.getItem('username'), id: localStorage.getItem('id'), userLogged: this.state.user})
            //console.log(this.state.username)
        }
        else
        {
            this.setState({userLogged: this.state.guest})
        }
        

    }

    render(){

        return(
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link to="/" className="navbar-brand ms-3" style={{color: "white"}}>WookStore</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Link to="/" className="navbar-brand ms-3" style={{color: "white"}}>Home</Link>
                        {this.state.userLogged}
                    </div>
                    <label id="userPanel" className="navbar-brand ms-3" style={{color: "white"}}>{this.state.username}</label>
                </div>
            </nav>
        )
    }
}

export default Header