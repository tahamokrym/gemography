import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Github from './Github'

class Rouatge extends Component {
    render(){
        return (
            <Router>
                <section className="wrapper_content">
                <Route exact path="/" component={Github} />
                <Route path="/Github" component={Github} />
                </section>
            </Router>
        );
    }
}

export default Rouatge;
