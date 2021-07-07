import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router";
//import { useHistory } from "react-router-dom";

// function HomeButton() {
//     const history = useHistory();
  
//     return history.push("/home");
//   }

class RegisterForm extends Component {

    constructor(){
        super()
        this.state = {
            redirect: '',
            errorMsg : '',
            email: '',
            username: '',
            name: '',
            phonenumber: '',
            pass: '',
            confpass: ''
        }

        //this.delta = this.delta.bind(this);
    }

    myChangeHandler = (event) => {
        let nam = event.target.name
        let val = event.target.value
        this.setState({[nam]: val})
    }

    doRegister = () => {
        // var email = document.getElementById('email').value
        // var username = document.getElementById('username').value
        // var name = document.getElementById('name').value
        // var phonenumber = document.getElementById('phonenumber').value
        // var pass = document.getElementById('pass').value
        // var confpass = document.getElementById('confpass').value

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const re2 = /\d/
        const re3 = /[a-zA-Z]/

        this.setState({errorMsg: ''})

        if(!(this.state.email).match(re))
        {
            this.setState({errorMsg: 'email format must be valid'})  
        }
        else if((this.state.username).length < 6)
        {
            this.setState({errorMsg: 'username must have 6 or more characters'}) 
        }
        else if((this.state.name).split(/\W+/).length !== 2)
        {
            this.setState({errorMsg: 'name must be 2 words'})                
        }
        else if(isNaN(this.state.phonenumber) || this.state.phonenumber[0] !== '0' || this.state.phonenumber.length !== 12)
        {
            this.setState({errorMsg: 'phone number must be numeric and starts with ‘0’'})  
        }
        else if(!re2.test(this.state.pass) || !re3.test(this.state.pass))
        {
            this.setState({errorMsg: 'password must have both at least a number and a letter'}) 
        }
        else if(this.state.pass !== this.state.confpass)
        {
            this.setState({errorMsg: 'confirmation password must be the same as the password'}) 
        }
        else
        {
            console.log(JSON.stringify({
                email: this.state.email,
                username: this.state.username,
                name: this.state.name,
                phonenumber: this.state.phonenumber,
                pass: this.state.pass
            }))
            fetch("http://localhost:9000/users/register", {
                crossDomain: true,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    username: this.state.username,
                    name: this.state.name,
                    phonenumber: this.state.phonenumber,
                    pass: this.state.pass
                })
            })
            .then( res => {
                console.log(res)
                this.setState({redirect: '/Login'})
            })
            .catch(err => console.log(err));

            console.log("sukses")
            
        }

    }

    componentDidMount(){
        // fetch("http://localhost:9000/userSession", {
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

        if(this.state.redirect)
        {
            return <Redirect to={this.state.redirect} />
        }

        return(
            <div className="container-fluid">
                <h1 style={{textAlign: 'center'}}>Register</h1>
                <div>
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" name="email" onChange={this.myChangeHandler} />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Username:</label>
                    <input type="text" className="form-control" name="username" onChange={this.myChangeHandler} />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Name:</label>
                    <input type="text" className="form-control" name="name" onChange={this.myChangeHandler} />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Phonenumber:</label>
                    <input type="text" className="form-control" name="phonenumber" onChange={this.myChangeHandler} />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password:</label>
                    <input type="password" className="form-control" name="pass" onChange={this.myChangeHandler} />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Confirm Password:</label>
                    <input type="password" className="form-control" name="confpass" onChange={this.myChangeHandler} />
                </div>
                <button type="button" onClick={this.doRegister} className="btn">Submit</button>
                <span id="errorMsg" style={{color: 'red', marginLeft: '5px'}}>{this.state.errorMsg}</span>
            </div>
        )
    }

}

export default RegisterForm