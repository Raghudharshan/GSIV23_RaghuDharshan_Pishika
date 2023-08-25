import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import FiltersGroup from '../FiltersGroup'
import MovieCard from '../MovieCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllMoviesSection extends Component {
  state = {
    moviesList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    page: 1,
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {page} = this.state
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?page=${page}`
    // console.log(apiUrl)
    // const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false`
    // https://api.themoviedb.org/3/movie/upcoming
    const options = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWI5OTQ5ODJkOGY4YmYxZmI5MDljMzAzOTUwZTZkNCIsInN1YiI6IjY0ZGYyOGJkZDEwMGI2MTRiMzAwYzMyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NG3PTf3ll3PeCFNq4hoUNny3mRJ0IS_k3tgvijwsbPQ`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.results.map(movie => ({
        title: movie.title,
        overview: movie.overview,
        id: movie.id,
        imageUrl: movie.poster_path,
        averageVote: movie.vote_average,
      }))
      console.log(updatedData)
      this.setState({
        moviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getMoviesSearch = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput} = this.state
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false`
    // const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false`
    // https://api.themoviedb.org/3/movie/upcoming
    const options = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWI5OTQ5ODJkOGY4YmYxZmI5MDljMzAzOTUwZTZkNCIsInN1YiI6IjY0ZGYyOGJkZDEwMGI2MTRiMzAwYzMyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NG3PTf3ll3PeCFNq4hoUNny3mRJ0IS_k3tgvijwsbPQ`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.results.map(movie => ({
        title: movie.title,
        overview: movie.overview,
        id: movie.id,
        imageUrl: movie.poster_path,
        averageVote: movie.vote_average,
      }))
      console.log(updatedData)
      this.setState({
        moviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="movies-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="movies-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-movies-error"
        className="movies-failure-img"
      />
      <h1 className="movie-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="movies-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  onDecrementPage = () => {
    const {page} = this.state
    if (page > 1) {
      this.setState(prevState => ({page: prevState.page - 1}), this.getMovies)
    }
  }

  onIncrementPage = () => {
    this.setState(prevState => ({page: prevState.page + 1}), this.getMovies)
  }

  renderMoviesListView = () => {
    const {moviesList, page} = this.state
    const shouldShowMoviesList = moviesList.length > 0

    return shouldShowMoviesList ? (
      <div className="all-movies-container">
        <ul className="movies-list">
          {moviesList.map(movie => (
            <MovieCard movieData={movie} key={movie.id} />
          ))}
        </ul>
        <div className="page-container">
          <button
            type="button"
            className="page-controller-button"
            onClick={this.onDecrementPage}
          >
            <p className="previous">Previous Page</p>
            <BsDashSquare className="page-controller-icon" />
          </button>
          <p className="page">{page}</p>
          <button
            type="button"
            className="page-controller-button"
            onClick={this.onIncrementPage}
          >
            <BsPlusSquare className="page-controller-icon" />
            <p className="next">Next Page</p>
          </button>
        </div>
      </div>
    ) : (
      <div className="no-movies-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-movies-img"
          alt="no movies"
        />
        <h1 className="no-movies-heading">No Movies Found</h1>
        <p className="no-movies-description">
          We could not find any movies. Try other movies.
        </p>
      </div>
    )
  }

  renderMoviesSearchListView = () => {
    const {moviesList} = this.state
    const shouldShowMoviesList = moviesList.length > 0

    return shouldShowMoviesList ? (
      <div className="all-movies-container">
        <ul className="movies-list">
          {moviesList.map(movie => (
            <MovieCard movieData={movie} key={movie.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-movies-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-movies-img"
          alt="no movies"
        />
        <h1 className="no-movies-heading">No Movies Found</h1>
        <p className="no-movies-description">
          We could not find any movies. Try other movies.
        </p>
      </div>
    )
  }

  renderAllMovies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMoviesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderAllSearchMovies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMoviesSearchListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  clearFilters = () => {
    this.setState(
      {
        searchInput: '',
      },
      this.getMovies,
    )
  }

  enterSearchInput = () => {
    const {searchInput} = this.state
    this.getMoviesSearch()
    if (searchInput.length === 0) {
      this.getMovies()
    }
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput}, this.getMoviesSearch)

    if (searchInput.length === 0) {
      this.getMovies()
    }
  }

  render() {
    const {searchInput} = this.state

    const searchInputlst = searchInput.length > 0
    console.log(searchInput.length)
    return searchInputlst ? (
      <div className="all-movies-container">
        <FiltersGroup
          searchInput={searchInput}
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
        />
        {this.renderAllSearchMovies()}
      </div>
    ) : (
      <div className="all-movies-section">
        <FiltersGroup
          searchInput={searchInput}
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
        />
        {this.renderAllMovies()}
      </div>
    )
  }
}

export default AllMoviesSection
