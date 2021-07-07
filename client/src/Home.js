import React, { Component } from "react";
//import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header'
import Footer from './components/Footer'
import Book from './components/Book'

class Home extends Component {
    
    constructor(){
        super()
        this.state = {
            bookView: ''
        }
    }

    componentDidMount(){

        fetch("http://localhost:9000/books/getAllBook", {
            crossDomain: true,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res =>{
            //console.log(res.json())
            return res.json()
        }).then(data => {
            console.log(data)
            this.setState({ bookView: data.map(book =>  <Book id={book._id} bookName={book.bookName} price={book.price} image={book.image} author={book.author} />)})
        })
        
    }
    
    render() {
        return (
            <React.StrictMode>
                <Header />
                <br /> 
                <div style={{margin: "auto", display: "block", width: "90%"}}>
                    {this.state.bookView}
                </div>
                <br />
                <br />
                <Footer />
            </React.StrictMode>    
        );
    }
}

export default Home;