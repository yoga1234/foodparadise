import React, { Component } from 'react'
import axios from 'axios'
import { API } from '../config/api'
import CategoryList from '../components/CategoryList'

const categoriesDummy = [
  {
    "categories": {
      "id": 1,
      "name": "Delivery"
    }
  },
  {
    "categories": {
      "id": 2,
      "name": "Dine-out"
    }
  },
  {
    "categories": {
      "id": 3,
      "name": "Nightlife"
    }
  },
  {
    "categories": {
      "id": 4,
      "name": "Catching-up"
    }
  }
]

class City extends Component {
  constructor() {
    super()
    this.state = {
      city: null,
      categories: null,
      categorySelected: null,
      keyword: ''
    }
  }

  categoryClickHandler = (category) => {
    this.setState({ categorySelected: category })
  }

  changeKeywordHandler = (event) => {
    this.setState({ keyword: event.target.value })
  }

  transformCategoriesData(categories) {
    let categoriesTransformed = categories.map(category => {
      return category.categories
    })

    return categoriesTransformed
  }

  getCityData = (city_id) => {
    let url = `${API.zomato.baseUrl}/cities`
    axios.get(url, {
      headers: {
        'user-key': API.zomato.api_key
      },
      params: {
        city_ids: `${city_id}`
      }
    })
    .then(({ data }) => {
      let city = data.location_suggestions[0]
      this.setState({ city })
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    let categories = this.transformCategoriesData(categoriesDummy)
    this.setState({ categories })

    // cara mendapatkan parameter city_id dari url / route
    let { city_id } = this.props.match.params
    this.getCityData(city_id)
  }

  render() {
    return (
      <div className="container-fluid" style={{ marginTop: 30, marginBottom: 30 }}>
        {
          this.state.city && (
            <div className="row">
              <div className="col">
                <h4 className="text-success">
                  Restaurant in { this.state.city.name }, { this.state.city.country_name}
                </h4>
              </div>
            </div>
          )
        }
        <div className="row">
          <div className="col-3">
            <h5>Categories</h5>
            {
              this.state.categories && (
                <div className="list-group">
                  <CategoryList
                    categories={this.state.categories}
                    categorySelected={this.state.categorySelected}
                    categoryClickHandler={(category) => this.categoryClickHandler(category)}
                  />
                </div>
              )
            }
          </div>
          <div className="col">
            <h5>Keyword</h5>
            <div className="card">
              <div className="card-body">
                <div className="form-row">
                  <div className="col-10">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Type keyword i.e : restaurant's name, location, cuisine, etc."
                      value={this.state.keyword}
                      onChange={this.changeKeywordHandler}
                    />
                  </div>
                  <div className="col">
                    <button className="btn btn-primary">
                      Add to criteria
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default City 