import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
    Link
  } from 'react-router-dom';
  

class Book extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: '',
            bookName: '',
            price: '',
            image: '',
            author: ''
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {id: props.id, bookName: props.bookName, price: props.price, image: props.image, author: props.author}
    }

    render(){
        return(
            <div className="card" style={{display: "inline-block", marginLeft: "10px", marginTop: "10px", textAlign: "center"}}>
                <img className="card-img-top" img src={this.state.image} style={{height: "300px", width:"300px"}} alt="Gambar Buku" />
                <div className="card-body">{this.state.author} <br/> <label> <strong> <Link to={"/detailBook?_id=" + this.state.id}> {this.state.bookName} </Link> </strong> </label> <br/> <label style={{color: "red"}}>Rp.  {this.state.price} </label> </div>
            </div>
        )
    }

}

export default Book