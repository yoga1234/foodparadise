import React, { Component } from 'react'

import Navbar from './components/Navbar'
import ImageAndWelcome from './components/ImageAndWelcome'
import FeaturedCities from './components/FeaturedCities'

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
          <div className="col">
            <h3>Search City</h3>
            <div className="card">
              <div className="card-body">
                <div className="form-row">
                  <div className="col-11">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Type a keyword or city name"
                      value={this.state.keyword}
                      onChange={this.changeKeywordHandler}
                    />
                  </div>
                  <div className="col-1">
                    <button
                      className="btn btn-primary"
                      type="button"
                    > 
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end of call */}
        </div>
        {/* end of container */}
      </>
    );
  }
}

export default App;
