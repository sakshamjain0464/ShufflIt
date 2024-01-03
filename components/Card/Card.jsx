import "/components/Card/card.css"
import PropTypes from 'prop-types'

export default function Card(props) {
  return (
    <div className="card" style={{ backgroundImage: `url(${props.url})` }}>
        <div className="card-btn">
            <i className="fa-solid fa-eye"></i>
        </div>
    </div>
  )
}

Card.propTypes = {
    url : PropTypes.string.isRequired
}

