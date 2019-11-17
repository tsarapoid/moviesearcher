import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  state = {
            value: '',
            movies: [],
          }
  
  onChange = event => {
    this.setState({ value: event.target.value }, () =>
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=59017ce86d5101576f32f47160168519&query=${this.state.value}`)
        .then(response => this.setState({ movies: response.data.results }))
        .catch(error => console.log(error))
      );
    console.log(event.target.value);
  }

  render() {
    return (
      <React.Fragment>
        <input value={this.state.value} onChange={this.onChange} />
        {this.state.movies.map(movie => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </React.Fragment>
    )
  }
}

export default App
