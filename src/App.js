import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import City from './pages/City'

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Route path="/" exact component={Home}></Route>
        <Route path="/city/:city_id" component={City}></Route>
        <Footer />
      </Router>
    );
  }
}

export default App;
