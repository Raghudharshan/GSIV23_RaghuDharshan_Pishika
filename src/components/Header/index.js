import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="nav-header">
    <div className="nav-content">
      <div className="nav-bar-mobile-logo-container">
        <Link to="/">
          <img
            className="website-logo"
            src="https://res.cloudinary.com/dumhxpqhz/image/upload/v1692818765/Movies-design-china-name_csdwuo.png"
            alt="website logo"
          />
        </Link>
        <button type="button" className="nav-mobile-btn">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
            alt="nav logout"
            className="nav-bar-img"
          />
        </button>
      </div>

      <div className="nav-bar-large-container">
        <Link to="/">
          <img
            className="website-logo"
            src="https://res.cloudinary.com/dumhxpqhz/image/upload/v1692818765/Movies-design-china-name_csdwuo.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu">
          <li className="nav-menu-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-menu-item">
            <Link to="/movies" className="nav-link">
              Movies
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-desktop-btn">
          Logout
        </button>
      </div>
    </div>
    <div className="nav-menu-mobile">
      <ul className="nav-menu-list-mobile">
        <li className="nav-menu-item-mobile">
          <Link to="/" className="nav-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
              alt="nav home"
              className="nav-bar-img"
            />
          </Link>
        </li>

        <li className="nav-menu-item-mobile">
          <Link to="/movies" className="nav-link">
            <img
              src="https://res.cloudinary.com/dumhxpqhz/image/upload/v1692866086/free-movie-icon-850-thumb_eycu4i.png"
              alt="nav movies"
              className="nav-bar-img"
            />
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default withRouter(Header)
