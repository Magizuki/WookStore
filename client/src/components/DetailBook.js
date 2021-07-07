import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class BookForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: '',
            price: '',
            quantity: 1
        }
    }

    static getDerivedStateFromProps(props, state){
        return {id: props.id, price: props.price}
    }

    myChangeHandler = event => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    AddToCart = () => {
        fetch("http://localhost:9000/carts/addNewCart", {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: localStorage.getItem("id"),
                bookID: this.state.id,
                quantity: this.state.quantity
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            alert(data.message)
        })
    }

    render(){

        if(localStorage.getItem('username') !== null){
            return(
                <React.StrictMode>
                    <div className="col">
                        <div style={{backgroundColor: "aquamarine", padding: "10px"}}>
                            <h5 style={{color: "blue"}}>Soft Cover</h5>
                            <br />
                            <br />
                            <h5>Rp. {this.state.price}</h5> 
                        </div>
                        <br />
                        <label>Quantity</label>
                        <input type="number" id="quantity" name="quantity" min="1" value={this.state.quantity} onChange={this.myChangeHandler} style={{marginLeft: "5px"}} />
                        <button className="btn" onClick={this.AddToCart} style={{backgroundColor: "rgb(10, 54, 187)", color: "white", marginLeft: "5px"}}>Add to Cart</button>
                    </div>
                </React.StrictMode>
            )
        }

        return null

    }

}

class DetailBook extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: '',
            name: '',
            author: '',
            description: '',
            price: '',
            image: ''
        }
    }

    static getDerivedStateFromProps(props, state){
        return {id: props.id, name: props.name, author: props.author, description: props.description, price: props.price, image: props.image}
    }

    render(){
        return(
            <React.StrictMode>
                <br />
                <div className="row" style={{padding: "30px"}}>
                    <div className="col">
                        <img src={this.state.image} style={{width: "500px", height: "600px"}} alt={this.state.image}/>
                    </div>
                    <div className="col">
                        <h1>{this.state.name}</h1>
                        <label style={{color: "gray", fontSize: "20px"}}>{this.state.author}</label>
                        <br />
                        <br />
                        <h5 style={{color: "blue"}}>Description</h5>
                        <p>{this.state.description}</p>
                    </div>
                    <BookForm id={this.state.id} price={this.state.price} />
                </div>
            </React.StrictMode>
        )
    }

}

export default DetailBook