---

title: "Connecting a RESTful API with React and Redux - The Frontend"
date: "2018-06-23"
---

If you read the previous post, you should have a good idea of what this one will be about. If you're just curious how to hook up Redux to a RESTful API and don't want to bother with building the backend, then read along!

<!-- end -->

If you missed the last post and are wondering how the backend was set up, you can look [here](/).

It's just a relatively simple RESTful API built with Nodejs, Express, and MongoDB. So if you already know how to build APIs and are here for how the frontend works with React, or more specifically React and Redux, then look below.

Speaking of which, if you're going to follow along, I highly recommend you get the Redux DevTools extension.

[Redux DevTools for Chrome]('/')
[Redux DevTools for FireFox]('/')

(_This assumes you have knowledge of how React and Redux work and/or know how to do API calls with Axios or the Fetch API._)

(\_Note: You can view the source code [I NEED TO CREATE A LINK]())

<style>
  a {
    color: rgb(221, 153, 63);
    text-decoration: none;
    position: relative;
  }

  a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: rgb(221, 153,53);
  visibility: hidden;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
  margin: 0 0 -2px 0;
}

a:hover:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}

h1 > a {
  background-color: transparent !important;
  transition: none !important;
}

h1 > a:before {
  background-color: transparent !important;
}

pre {
  background: #eee
}

code {
  background: #eee
}
</style>

If you don't have create-react-app installed, open your terminal and run `npm i -g create-react-app`.

Afterwards, navigate to the root directory of the project we worked on [last week](/), and run `create-react-app client`.

This is just some boilerplate that comes from Facebook, the creators of React, and will create a quick setup to help get things going so you don't have to configure webpack and all the other monotonous things that come with the process.

Next, cd into the client folder and run `npm run eject`. This is so we can get complete control over our npm scripts and configuration files, and it also conveniently sets up Babel for us allowing us to write ES6.

Speaking of npm scripts, go inside of `package.json` and add the following line which will give us access to our API:

`"proxy": "http://localhost:5000/"`

Aside from that, lets install some dependencies!

`npm i axios redux react-redux redux-thunk react-router-dom`

Axios is for making AJAX requests (of course you could use the Fetch API, this is just what I prefer), and react-router-dom is to handle the navigation for our different routes that we'll be setting up.

The other three packages are for connecting [Redux](/link-to-redux) to React, as Redux itself is not a package that was created just _for_ React, but can be used with other frameworks as well. More specifically I'm talking about the `redux` package. The `react-redux` package however is what allows us to connect Redux to React.

Now `redux-thunk` is middleware (if know some language or framework like Node / Express, this is pretty much _exactly_ the same as what middleware is used for the backend) that lets us handle async data coming from another API. In this case, it's pretty paramount.

---

## Setting up Redux with React

(_Note: If you already have a way you prefer to set Redux up with React then by all means go with what you're most comfortable with. This is just how I like to set things up personally_)

We'll start with setting up Redux in App.js by modifying the file to look like this:

```
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
```

The `{ Provider }` import is what essentially passes our store and gives our components access to our new state, while everything else that has to do with the router imports is just for our routing.

Don't worry about the `Home` and `store` files, we'll be creating those shortly.

Inside of the `client` directory, make a new folder called `store`, put two additional folders `reducers`, and `actions` along with it, and create a file called `store.js`.

Now let's set up each respective file so we can create our store to hold our decentralized state:

In store.js

```
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
```

In `client/store/actions`, create two new files called `actionTypes.js`, and `movieActions.js`.

`actionTypes.js`

```
export const GET_MOVIES = 'GET_MOVIES';
export const ADD_MOVIE = 'ADD_MOVIE';
```

You can name these whatever you want; ideally though, you want them to be as descriptive as they can be with what your intentions are.

In `movieActions.js`

```
import axios from 'axios';
import { GET_MOVIES, ADD_MOVIE } from './actionTypes';

export const getMovies = () => dispatch => {
  axios
    .get('/api/movies')
    .then(res => dispatch({ type: GET_MOVIES, payload: res.data }))
    .catch(err => console.log(err));
};

export const addMovie = movieData => dispatch => {
  axios
    .post('/api/movies/', movieData)
    .then(res => dispatch({ type: ADD_MOVIE, payload: res.data }))
    .catch(err => console.log(err));
};
```

If you're wondering what actionTypes are exactly, you can think of them as placeholder names you choose depending on what you're trying to do with requests to the API. GET_MOVIES is for getting movies, ADD_MOVIE is for adding a movie, etc.

As far as the payload is concerned, that's just something you'll see commonly when reading blogs and tutorials about Redux. It's just another word for data in this case, where it returns or sends the data you're requesting / sending to the API.

---

Now that the actions are set up, navigate out of that directory and go into the reducers folder.

movieReducer.js

```
import { GET_MOVIES, ADD_MOVIE } from '../actions/actionTypes';

const initialState = {
  movies: []
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload
      }

    case ADD_MOVIE:
      return {
        ...state,
        movies: [action.payload, ...state.movies]
      }

    default:
      return state;
  }
}

export default movieReducer;
```

rootReducer.js

```
import { combineReducers } from 'redux';
import movieReducer from './movieReducer';

export default combineReducers({
  movie: movieReducer
});
```

The `movieReducer.js` file is responsible for specifying how the existing state changes in this file in responses sent to `store.js`. Just keep in mind that actions are used for describing _what happened_, but not how the state changes.

Also, if you're unaware of functional programming concepts, the reason why you should use the spread `...` operator is so it doesn't mutate or manipulate the existing state. What that operator is doing in this case just retains a copy of the current state you want to make changes to without directly altering it.

Whew! Now that Redux is finally set up with React, let's move on to the more visual aspect of things where you'll finally be able to see the data being pulled from the API and displayed on the screen.

---

## Calling the API and Outputting the Data

Head inside of the same directory as App.js, and create a folder called `components`, and a file `Home.js` inside of it.

Home.js

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovies } from '../store/actions/movieActions';
import PropTypes from 'prop-types';

class Home extends Component {
  componentDidMount() {
    this.props.getMovies();
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <h2>Home</h2>
      </div>
    );
  }
}

Home.propTypes = {
  getMovies: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movie: state.movie
});

export default connect(
  mapStateToProps,
  { getMovies }
)(Home);
```

The connect function is a Higher Order Component (or HOC) that connects this component to our Redux store.

If you're confused what the difference is between using our store as state as opposed to using regular state you might see defined in a component itself, basically the state we have access to in our store is our global state, or App level state. Whereas state you'd define in a component is just component level state.

You can also mix and use both when the need arises.

As far as `mapStateToProps` is concerned, it maps our state we created in the `reducers` folder to props in this component. So if we wanted to access the `movies` state in our store, we'd just have to do `this.props.movies.movie`.

For a better visualization, navigate to the root level directory where we implemented our API and `npm run dev`

Once the server and client spin up, hit ctrl+shift+i (or cmd+shift+i if you're on a Mac), and make your way to the Redux DevTools.

You should be looking at something like this:

[Redux DevTools Window](https://i.imgur.com/gl9B5i2.png)

The reason why movies is just returning an empty object is because there's nothing in the database to return, so why don't we change that?

---

## Adding a Movie to the Database via the Client

Now make some more changes to `Home.js` like so:

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovies, addMovie } from '../store/actions/movieActions';
import PropTypes from 'prop-types';

class Home extends Component {
  state = {
    name: '',
    description: '',
    releaseDate: ''
  };

  componentDidMount() {
    this.props.getMovies();
  }

  onSubmitHandler = event => {
    event.preventDefault();

    const { name, description, releaseDate } = this.state;

    const movieData = {
      name,
      description,
      releaseDate
    };

    this.props.addMovie(movieData);
    this.setState({
      name: '',
      description: '',
      releaseDate: ''
    });
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, description, releaseDate } = this.state;
    const { movies } = this.props.movie;

    let movieList;

    if (movies) {
      movieList = movies.map(movie => (
        <section
          key={movie._id}
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            justifyContent: 'space-evenly'
          }}
        >
          <div>
            <h4>Name</h4>
            <span>{movie.name}</span>
          </div>
          <div>
            <h4>Description</h4>
            <span>{movie.description}</span>
          </div>
          <div>
            <h4>Release Date</h4>
            <span>{movie.releaseDate}</span>
          </div>
        </section>
      ));
    }

    return (
      <div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div>
            <h2>Home</h2>
          </div>
          {movieList}
          <div style={{ marginTop: '25px' }}>
            <h3 style={{ textAlign: 'center' }}>Movie Form</h3>
            <form onSubmit={this.onSubmitHandler}>
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.onChangeHandler}
                placeholder="Name"
              />
              <input
                type="text"
                name="description"
                value={description}
                onChange={this.onChangeHandler}
                placeholder="Description"
              />
              <input
                type="text"
                name="releaseDate"
                value={releaseDate}
                onChange={this.onChangeHandler}
                placeholder="Release Date"
              />
              <button type="submit">Add a Movie</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  getMovies: PropTypes.func.isRequired,
  addMovie: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movie: state.movie
});

export default connect(
  mapStateToProps,
  { getMovies, addMovie }
)(Home);
```
