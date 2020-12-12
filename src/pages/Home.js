import React, { Component } from 'react'
import axios from 'axios'

import ImageAndWelcome from '../components/ImageAndWelcome'
import CityList from '../components/CityList'
import SearchCity from '../components/SearchCity'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      featuredCities: null,
      citiesResultSearch: null,
      cityKeywordSearch: '',
      keyword: ''
    }
  }

  changeKeywordHandler = (event) => {
    this.setState({ keyword: event.target.value })
  }

  getFeaturedCities = () => {
    const url = 'https://developers.zomato.com/api/v2.1/cities'
    axios.get(url, {
      headers: {
        'user-key': '1673f06286e5d3d7825aa0430db649da'
      },
      params: {
        city_ids: "74, 11052, 170"
      }
    }).then(({data}) => {
      if (data.status === 'success') {
        this.setState({ featuredCities: data.location_suggestions })
      }
    }).catch(err => console.log(err))
  }

  searchHandle = () => {
    let keyword = this.state.keyword
    const url = 'https://developers.zomato.com/api/v2.1/cities'
    axios.get(url, {
      headers: {
        'user-key': '1673f06286e5d3d7825aa0430db649da'
      },
      params: {
        q: keyword
      }
    })
    .then(({ data }) => {
      if (data.status === 'success') {
        this.setState({
          citiesResultSearch: data.location_suggestions,
          keyword: '',
          cityKeywordSearch: keyword
        })
      }
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getFeaturedCities()
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
            onClickSearch={this.searchHandle}
          />
          <CityList
            title={'Search Result'}
            cities={this.state.citiesResultSearch}
            showSubtitle={true}
            subtitle={this.state.cityKeywordSearch}
          />
        </div>
      </>
    )
  }
}

export default Home
