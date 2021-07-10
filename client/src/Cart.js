import React, { Component } from "react"
import Header from './components/Header'
import Footer from './components/Footer'
import CartDetail from './components/CartDetail'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router";

class Cart extends Component{

    constructor(){
        super()
        this.state = {
            isPurchased : false,
            title : '',
            cartView : '',
            totalPrice : '',
            button: '',
            redirect: '',
            totalPriceLbl: ''
        }
    }

    doPurchase = () => {
        this.setState({isPurchased: true, button: (
            <React.StrictMode>
                <button className="btn" onClick={this.doFinish} style={{width: "50%"}}>Finish</button>
            </React.StrictMode>
        ), title: "Purchase Page", totalPriceLbl: <strong style={{color: "red"}}>{"Total Price: Rp. " + this.state.totalPrice}</strong>})
    }
    
    doRemoveAll = () => {
        this.setState({cartView: "No Cart Data"})
        fetch("http://localhost:9000/carts/removeAllCart", {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: localStorage.getItem('id')
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            alert(data.message)
            // this.setState({redirect: '/'})
        })
    }

    doFinish = () => {
        fetch("http://localhost:9000/carts/updatePaidStatus", {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: localStorage.getItem('id')
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            alert(data.message)
            this.setState({redirect: '/'})
        })
    }
    
    componentDidMount(){

        fetch("http://localhost:9000/carts/getUserCartList", {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: localStorage.getItem('id')
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
            if(data.length === 0){
                this.setState({cartView: <h1>No Cart Data</h1>})
            }
            else
            {
                for(let a = 0; a < data.length; a++){
                    fetch("http://localhost:9000/books/getBook", {
                        crossDomain: true,
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: data[a].bookID
                        })
                    }).then(res => {
                        return res.json()
                    }).then(data2 => {
                        console.log(data2.bookName)
                        this.setState({totalPrice: 0})
                        this.setState({cartView: <React.Fragment> {this.state.cartView} <CartDetail id={data[a]._id} img={data2.image} bookName={data2.bookName} author={data2.author} price={data2.price} bookID={data[a].bookID} quantity={data[a].quantity} /> </React.Fragment>, totalPrice: this.state.totalPrice + (data[a].quantity * data2.price)})
                        console.log(this.state.cartView + " " + this.state.totalPrice)
                    })
                }

                // data.map(cart => {
                //     fetch("http://localhost:9000/books/getBook", {
                //         crossDomain: true,
                //         method: 'POST',
                //         headers: {
                //             'Accept': 'application/json',
                //             'Content-Type': 'application/json',
                //         },
                //         body: JSON.stringify({
                //             id: cart.bookID
                //         })
                //     }).then(res => {
                //         return res.json()
                //     }).then(data2 => {
                //         this.setState({totalPrice: 0})
                //         this.setState({cartView: data2.map(book => <CartDetail id={cart._id} img={book.image} bookName={book.bookName} author={book.author} price={book.price} bookID={cart.bookID} quantity={cart.quantity} />), totalPrice: data2.map(book => this.state.totalPrice + (cart.quantity * book.price))})
                //     })
                // })

                if(this.state.isPurchased === false){
                    this.setState({button: (
                        <React.StrictMode>
                            <button className="btn" onClick={this.doRemoveAll} style={{width: "40%"}}>Clear Cart</button>
                            <button className="btn" onClick={this.doPurchase} style={{width: "40%", marginLeft: "10px"}}>Purchase</button>
                        </React.StrictMode>
                    ), title: "Cart"})
                }
                // else if(this.state.isPurchased === true){
                //     this.setState({button: (
                //         <React.StrictMode>
                //             <button className="btn" onClick={this.doFinish} style={{width: "50%"}}>Finish</button>
                //         </React.StrictMode>
                //     ), title: "Purchase Page", totalPriceLbl: <strong style={{color: "red"}}>{"Rp. " + this.state.totalPrice}</strong>})
                // }
                //this.setState({cartView: data.map(cart => <CartDetail id={cart._id} bookID={cart.bookID} quantity={cart.quantity}/>)})
            }
            
        })

    }

    render(){

        if(this.state.redirect)
        {
            return <Redirect to={this.state.redirect} />
        }

        return(
            <React.StrictMode>
                <Header />
                    <div className="container">
                        <br />
                        <h1>{this.state.title}</h1>
                        <ul className="list-group">
                            {this.state.cartView}
                        </ul>
                        {this.state.totalPriceLbl}
                        <br/>
                        {this.state.button}
                        <br />
                        <br />
                    </div>
                <Footer />
            </React.StrictMode>
        )

    }

}

export default Cart