import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import Movies from './components/Movies'
import MovieItemDetails from './components/MovieItemDetails'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/movies/:id" component={MovieItemDetails} />
      </Switch>
    )
  }
}

export default App
