import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">Movies That Get YOU Noticed</h1>
        <img
          src="https://res.cloudinary.com/dumhxpqhz/image/upload/v1692866246/cinema-background-with-movie-objects_1823384_x4myfa.jpg"
          alt="clothes that get you noticed"
          className="home-mobile-img"
        />
        <p className="home-description">
          India is now becoming one of the prominent markets for streaming
          platforms. More and more people nowadays prefer OTT over television as
          it offers a vivid content library, exclusive shows, movies, premieres
          and, most importantly, convenience. To cater to this growing viewer
          base, platforms like Netflix, Disney+ Hotstar, Amazon Prime Videos,
          and JioCinema are also in constant face-off to offer better content
          and user experience. But with so many platforms, it is always
          confusing for users to choose between one.
        </p>
        <Link to="/movies">
          <button type="button" className="shop-now-button">
            Show Movies
          </button>
        </Link>
      </div>
      <img
        src="https://res.cloudinary.com/dumhxpqhz/image/upload/v1692866246/cinema-background-with-movie-objects_1823384_x4myfa.jpg"
        alt="clothes that get you noticed"
        className="home-desktop-img"
      />
    </div>
  </>
)

export default Home
