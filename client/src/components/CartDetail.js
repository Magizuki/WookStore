import React, { Component } from "react"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
    Link
} from 'react-router-dom';
import { Redirect } from "react-router";

class CartDetail extends Component{

    constructor(props){
        super(props)
        this.state = {
            id: '',
            bookName: '',
            img: '',
            author: '',
            price: '',
            bookID: '',
            quantity: '',
            redirect: '',
            view: ''
        }
    }

    doRemoveBook = () => {
        fetch("http://localhost:9000/carts/removeCart", {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.id
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            this.setState({view: '', redirect: '/cart'})
            console.log(data.message)
        })
    }

    static getDerivedStateFromProps(props, state) {
        return {id: props.id, bookName: props.bookName, img: props.img, author: props.author, price: props.price, quantity: props.quantity, bookID: props.bookID}
    }

    componentDidMount(){
        this.setState({view: (
            <React.StrictMode>
                <li className="list-group-item">
                    <div className="row">
                        <div className="col">
                            <img src={this.state.img} style={{width: "400px", height: "450px"}} alt="buku" />
                            <br />
                            <Link to={"/detailBook?_id=" + this.state.bookID} style={{marginLeft: "40%", fontSize: "20px"}}> View Detail </Link>
                        </div>
                        <div className="col">
                            <h3>{this.state.bookName}</h3>
                            {this.state.author}
                            <br />
                            <br />
                            <br />
                            <strong style={{color: "red", fontSize: "20px"}}>{"Rp. " + this.state.price}</strong>
                            <br />
                            <br />
                            {"Quantity : " + this.state.quantity}
                        </div>
                        <div className="col">
                            <button className="btn" onClick={this.doRemoveBook} style={{marginTop: "100%", float: "right"}}> Remove Book</button>
                        </div>
                    </div>
                </li>
            </React.StrictMode>
        )})
    }

    render(){

        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }
        
        return this.state.view
    }
}

export default CartDetail