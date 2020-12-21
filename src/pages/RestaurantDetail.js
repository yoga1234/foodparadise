import React, { Component } from 'react'
import axios from 'axios'
import { API } from '../config/api'

class RestaurantDetail extends Component {
  constructor() {
    super()
    this.state = {
      restaurant: null
    }
  }

  getRestaurantData = (restaurant_id) => {
    let url = `${API.zomato.baseUrl}/restaurant`
    axios.get(url, {
      headers: {
        'user-key': API.zomato.api_key
      },
      params: {
        res_id: restaurant_id
      }
    })
    .then(({ data }) => {
      this.setState({ restaurant: data })
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    let { params } = this.props.match
    this.getRestaurantData(params.restaurant_id)
  }

  render() {
    return(
      <div className="container" style={{ marginTop: 30, marginBottom: 30 }}>
        <div className="row">
          <div className="col-12" style={{ marginBottom: 20 }}>
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col">
                    {
                      this.state.restaurant ? (
                        <>
                          <h4 className="text-success" style={{ fontWeight: 800 }}>{this.state.restaurant.name}</h4>
                          <h6 style={{ fontWeight: 600 }}>{this.state.restaurant.location.locality}</h6>
                          <h6 className="text-muted">{this.state.restaurant.location.address}</h6>
                        </>
                      ) : (
                        <p>Loading...</p>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="card-body">
                {
                  this.state.restaurant ? (
                    <div className="row">
                      <div className="col-6">
                        <img class="img-responsive" src={this.state.restaurant.featured_image} alt="" style={{ borderRadius: 5, width: 500 }} ></img>
                      </div>
                      <div className="col-6">
                        <table className="table">
                          <tbody>
                            <tr>
                              <td>Rating</td>
                              <td>
                                <p>{this.state.restaurant.user_rating.aggregate_rating}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>Cuisines</td>
                              <td>
                                {this.state.restaurant.cuisines}
                              </td>
                            </tr>
                            <tr>
                              <td>Cost for two</td>
                              <td>
                                {this.state.restaurant.currency + ' ' + this.state.restaurant.average_cost_for_two}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RestaurantDetail