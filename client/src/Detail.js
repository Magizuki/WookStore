import React, { Component } from "react"
import Header from './components/Header'
import Footer from './components/Footer'
import DetailBook from './components/DetailBook'
import queryString from 'query-string'

class Detail extends Component {

    constructor(){
        super()
        this.state = {
            id: '',
            bookName: '',
            author: '',
            description: '',
            price: '',
            image: ''
        }
    }

    componentDidMount(){

        const value = queryString.parse(this.props.location.search)
        console.log(value._id)
        fetch("http://localhost:9000/books/getBook", {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: value._id
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log("id ku adalah " + data._id)
            if(data._id != null)
            {
                this.setState({id: data._id, bookName: data.bookName, author: data.author, description: data.description, price: data.price, image: data.image })
            }

        })

    }

    render(){

        return(
            <React.StrictMode>
                <Header />
                <br />
                <DetailBook id={this.state.id} name={this.state.bookName} author={this.state.author} description={this.state.description} price={this.state.price} image={this.state.image} />
                <br />
                <Footer position="absolute"/>
            </React.StrictMode>
        )

    }

}

export default Detail