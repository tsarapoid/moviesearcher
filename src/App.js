import React, { Component } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    maxWidth: 345,
    margin: 10
  },
  media: {
    height: 500
  }
}

class App extends Component {
  state =
    {
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

  componentDidMount() {
    axios
      .get('https://api.themoviedb.org/3/movie/top_rated?api_key=59017ce86d5101576f32f47160168519')
      .then(response => this.setState({ movies: response.data.results }))
      .catch(error => console.log(error))
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <TextField
          label="Search for the movie!"
          placeholder="enter movie name"
          fullWidth
          margin="normal"
          InputLabelProps={{shrink:true}}
          value={this.state.value}
          onChange={this.onChange}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {this.state.movies.map(movie => (
            <Card className={classes.card} key={movie.id}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  title="movie poster"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {movie.title}
                  </Typography>
                  <Typography component="p">{movie.overview}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(App)