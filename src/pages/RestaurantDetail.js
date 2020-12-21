import React, { Component } from 'react'
import axios from 'axios'
import { API } from '../config/api'
import RestaurantProfile from '../components/RestaurantProfile'
import RatingLabel from '../components/RatingLabel'

class RestaurantDetail extends Component {
  constructor() {
    super()
    this.state = {
      restaurant: null,
      reviews: null
    }
  }

  getReviewsData = (restaurant_id) => {
    let url = `${API.zomato.baseUrl}/reviews`
    axios.get(url, {
      headers: {
        'user-key': API.zomato.api_key
      },
      params: {
        res_id: restaurant_id
      }
    })
    .then(({ data }) => {
      this.setState({ reviews: data.user_reviews })
    })
    .catch(err => console.log(err))
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
    this.getReviewsData(params.restaurant_id)
  }

  render() {
    return(
      <div className="container" style={{ marginTop: 30, marginBottom: 30 }}>
        <div className="row">
          <div className="col-12" style={{ marginBottom: 20 }}>
            <RestaurantProfile restaurant={this.state.restaurant} />
          </div>
          <div className="col-12" style={{ marginBottom: 20 }}>
            <div className="card">
              <div className="card-body">
                <h4 className="text-success" style={{ fontWeight: 800 }}>Reviews</h4>
                {
                  this.state.reviews ? (
                    this.state.reviews.map(({ review }) => (
                      <div className="card border-success" style={{ marginBottom: 5 }}>
                        <div className="card-body">
                          <div className="row" style={{ marginBottom: 20 }}>
                            <div className="col-1" style={{ border: '0px solid black' }}>
                              <img className="img-responsive" src={review.user.profile_image} alt="" style={{ borderRadius: '50%', width: 80}} ></img>
                            </div>
                            <div className="col-11" style={{ border: '0px solid black' }}>
                              <h6 className="font-weigh-bold">{review.user.name}</h6>
                              <RatingLabel
                                text={`${review.user.foodie_level_num} (${review.user.foodie_level})`}
                                labelColor={`$review.user.foodie_color`}
                              />
                            </div>
                          </div>
                          <h6 className="card-text text-muted">{review.review_time_friendly}</h6>
                          <RatingLabel
                            text={`${review.rating} (${review.rating_text})`}
                            labelColor={`${review.rating_color}`}
                          />
                          <p className="card-text">{review.review_text}</p>
                        </div>
                      </div>
                    ))
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