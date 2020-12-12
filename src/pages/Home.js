import React, { Component } from 'react'

import ImageAndWelcome from '../components/ImageAndWelcome'
import CityList from '../components/CityList'
import SearchCity from '../components/SearchCity'

const citiesDummy = [
  { id: 74, name: 'Jakarta', country_name: 'Indonesia' },
  { id: 11052, name: 'Bandung', country_name: 'Indonesia' },
  { id: 170, name: 'Bali', country_name: 'Indonesia' }
]

class Home extends Component {
  constructor() {
    super()
    this.state = {
      featuredCities: null,
      keyword: ''
    }
  }

  changeKeywordHandler = (event) => {
    this.setState({ keyword: event.target.value })
  }

  render() {
    return(
      <>
        <ImageAndWelcome />
        <div className="container" style={{ marginTop: 30, marginBottom: 30 }}>
          <CityList title={'Featured City'} cities={this.state.featuredCities} />
          <SearchCity
            value={this.state.keyword}
            onChange={this.changeKeywordHandler}
          />
          <CityList title={'Search Result'} cities={citiesDummy} />
        </div>
      </>
    )
  }
}

export default Home
