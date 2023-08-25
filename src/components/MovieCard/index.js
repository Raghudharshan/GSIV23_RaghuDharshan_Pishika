import {Link} from 'react-router-dom'

import './index.css'

const MovieCard = props => {
  const {movieData} = props
  const {title, overview, id, imageUrl, averageVote} = movieData
  // console.log(id)
  // console.log(price)
  const overviewlst = overview.split(' ')
  let text = ''

  for (let i = 0; i < 10; i += 1) {
    text = text.concat(overviewlst[i], ' ')
  }
  //

  return (
    <li className="movie-item">
      <Link to={`/movies/${id}`} className="link-item">
        <img
          src={`https://image.tmdb.org/t/p/original/${imageUrl}`}
          alt="movie"
          className="thumbnail"
        />
        <div className="title-rating">
          <h1 className="title">{title}</h1>
          {/* <p className="brand">{brand}</p> */}
          <div className="rating-container">
            <p className="rating">{averageVote.toFixed(1)}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
        <p className="overview">{text}</p>
      </Link>
    </li>
  )
}
export default MovieCard
