import React, { Component } from 'react'

import Navbar from './components/Navbar'
import ImageAndWelcome from './components/ImageAndWelcome'
import FeaturedCities from './components/FeaturedCities'
import SearchCity from './components/SearchCity'

const citiesDummy = [
  { id: 74, name: 'Jakarta', country_name: 'Indonesia' },
  { id: 11052, name: 'Bandung', country_name: 'Indonesia' },
  { id: 170, name: 'Bali', country_name: 'Indonesia' }
]

class App extends Component {
  constructor() {
    super()
    this.state = {
      keyword: ''
    }
  }

  changeKeywordHandler = (event) => {
    this.setState({ keyword: event.target.value })
  }

  render() {
    return (
      <>
        <Navbar />
        <ImageAndWelcome />
        <div className="container" style={{ marginTop: 30, marginBottom: 30 }}>
          <FeaturedCities cities={citiesDummy} />
          <SearchCity
            value={this.state.keyword}
            onChange={this.changeKeywordHandler}
          />
        </div>
        {/* end of container */}
      </>
    );
  }
}

export default App;
