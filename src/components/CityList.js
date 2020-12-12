import React from 'react'
import CityCard from './CityCard'

const CityList = (props) => (
  <>
    <div className="row">
      <div className="col-12">
        <h3>{props.title}</h3>
        {
          props.showSubtitle === true && props.subtitle !== '' &&
            <h6 classNames="text-muted">Search result for keyword '{props.subtitle}'</h6>
        }
      </div>
    </div>
    <div className="row">
    { props.cities == null ? (
      <div className="col">
        <p>Loading . . .</p>
      </div>
    ) : (
      props.cities.map(city =>
        <CityCard key={city.id} city={city} />
      )
    )}

    </div>
  </>
)

export default CityList