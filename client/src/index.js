import React from 'react';
import ReactDOM from 'react-dom';
// import Header from './Header'
// import Footer from './Footer'
// import RegisterForm from './RegisterForm'
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Detail from './Detail'
import Cart from './Cart'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
           <Route exact path="/" component = {Home} />
           <Route exact path="/Register" component={Register} />
           <Route exact path="/Login" component={Login} />
           <Route exact path="/detailBook" component={Detail} />
           <Route exact path="/cart" component={Cart} />
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
