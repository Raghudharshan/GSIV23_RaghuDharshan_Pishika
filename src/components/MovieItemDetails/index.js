import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'
import MovieCard from '../MovieCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    movieData: {},
    similarMoviesData: [],
    productionName: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieData()
  }

  getFormattedData = data => ({
    title: data.title,
    overview: data.overview,
    id: data.id,
    runtime: data.runtime,
    status: data.status,
    imageUrl: data.poster_path,
    averageVote: data.vote_average,
    releaseDate: data.release_date,
    tagline: data.tagline,
  })

  getMovieData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}`
    console.log(apiUrl)
    const apiSimilarMovies = `https://api.themoviedb.org/3/movie/${id}/similar`
    const options = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWI5OTQ5ODJkOGY4YmYxZmI5MDljMzAzOTUwZTZkNCIsInN1YiI6IjY0ZGYyOGJkZDEwMGI2MTRiMzAwYzMyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NG3PTf3ll3PeCFNq4hoUNny3mRJ0IS_k3tgvijwsbPQ`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const similarMoviesResponse = await fetch(apiSimilarMovies, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = this.getFormattedData(fetchedData)
      if (similarMoviesResponse.ok) {
        const fetchedSimilarMoviesData = await similarMoviesResponse.json()
        const updatedSimlarMoviesData = fetchedSimilarMoviesData.results.map(
          movie => ({
            title: movie.title,
            overview: movie.overview,
            id: movie.id,
            imageUrl: movie.poster_path,
            averageVote: movie.vote_average,
          }),
        )
        console.log(updatedSimlarMoviesData)
        const updatedProductionName = fetchedData.production_companies.map(
          each => each.name,
        )
        this.setState({
          movieData: updatedData,
          similarMoviesData: updatedSimlarMoviesData,
          productionName: updatedProductionName,
          apiStatus: apiStatusConstants.success,
        })
      }
    }

    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="movies-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="movie-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="movie-not-found-heading">Movie Not Found</h1>
      <Link to="/movies">
        <button type="button" className="button">
          Watch Other Movies
        </button>
      </Link>
    </div>
  )

  renderMovieDetailsView = () => {
    const {movieData, productionName, similarMoviesData} = this.state
    const {
      imageUrl,
      runtime,
      overview,
      averageVote,
      title,
      releaseDate,
      status,
      tagline,
    } = movieData
    // console.log()
    // this.refresh()
    return (
      <div className="movie-details-success-view">
        <h1 className="details">Movie Details</h1>
        <div className="movie-details-container">
          <img
            src={`https://image.tmdb.org/t/p/original/${imageUrl}`}
            alt="movie"
            className="movie-image"
          />
          <div className="movie">
            <h1 className="movie-name">{title}</h1>
            <div className="rating-and-reviews-count">
              <div className="rating-container-1">
                <p className="rating-1">{averageVote.toFixed(1)} </p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star-1"
                />
              </div>
              <p>Reviews</p>
            </div>
            <div className="details">
              {'Year: '
                .concat(releaseDate.split('-')[0])
                .concat(
                  ' | ',
                  'Runtime: ',
                  runtime,
                  ' mins',
                  ' | ',
                  'Status: ',
                  status,
                )}
            </div>

            <p className="label">Production Cast : </p>
            <div className="">
              {productionName.map(each => (
                <p className="value">
                  {each}
                  <br />
                </p>
              ))}
            </div>

            <p className="label label-1">Description : </p>
            <div className="label-value-container">
              <p className="value">{overview}</p>
            </div>
            <div className="label-value-container">
              <p className="label">Tagline:</p>
              <p className="value">{tagline}</p>
            </div>

            <button type="button" className="button add-to-cart-btn">
              Watch Now
            </button>
          </div>
        </div>
        <h1 className="similar-movies-heading">Similar Movies To Watch</h1>
        <p>Please refresh after selecting movie below!</p>
        <button
          type="button"
          className="button add-to-cart-btn refresh"
          onClick={() => window.location.reload(false)}
        >
          Refresh
        </button>
        <div className="all-movies-container">
          <ul className="movies-list">
            {similarMoviesData.map(movie => (
              <MovieCard movieData={movie} setId={this.setId} key={movie.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderMovieDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMovieDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="movie-item-details-container">
          {this.renderMovieDetails()}
        </div>
      </>
    )
  }
}

export default MovieItemDetails
