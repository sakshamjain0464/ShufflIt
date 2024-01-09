import "/components/Card/card.css";
import PropTypes from "prop-types";

export default function Card(props) {
  return (
    <div className="card" style={{ backgroundImage: `url(${props.url})` }}>
      <div className="card-btn">
        <a href={props.imgUrl} target="_blank" rel="noreferrer">
          <i className="fa-solid fa-download"></i>
        </a>
      </div>
    </div>
  );
}

Card.propTypes = {
  url: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
};
