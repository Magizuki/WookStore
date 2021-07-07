import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router";

class LoginForm extends Component {

    constructor(){
        super()
        this.state = {
            redirect: '',
            errorMsg: '',
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name
        let val = event.target.value
        this.setState({[nam]: val})
    }

    doLogin = () => {

        console.log("tes")

        this.setState({errorMsg: ''})

        if(this.state.username === "" || this.state.pass === "")
        {
            this.setState({errorMsg: 'username and password must be filled'}) 
            return
        }

        console.log(JSON.stringify({
            username: this.state.username,
            pass: this.state.pass
        }))

        
        fetch("http://localhost:9000/users/login", {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                pass: this.state.pass
            })
        })
        .then( res => {
            console.log("tes")
            //console.log(res.json())
            return res.json()
        })
        .then(data => {
            console.log(data)
            console.log(data)
            console.log(data.username)
            if(data.username)
            {
                //Buat session di localStorage
                localStorage.setItem('username', data.username)
                localStorage.setItem('id', data.id)
                localStorage.setItem('name', data.name)
                this.setState({redirect: "/"})
            }
            else
            {
                this.setState({errorMsg: data.message})
            }
        })

        console.log("sukses")
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
        //         this.setState({redirect: "/"})
        //     } 
        // })

        if(localStorage.getItem('username'))
        {
            this.setState({redirect: "/"})
        }

    }

    render(){

        if(this.state.redirect === "/")
        {
            return <Redirect to={this.state.redirect} />
        }

        return(
            <div className="container-fluid">
                <h1 style={{textAlign: "center"}}>Login</h1>
                <div className="mb-3">
                    <label className="form-label">Username:</label>
                    <input type="text" className="form-control" id="username" name="username" onChange={this.myChangeHandler} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" id="pass" name="pass" onChange={this.myChangeHandler} />
                </div>
                <button type="button" onClick={this.doLogin} className="btn">Sign In</button>
                <span id="errorMsg" style={{color: "red", marginLeft: "5px"}}>{this.state.errorMsg}</span>  
            </div>
        )
    }

}

export default LoginForm