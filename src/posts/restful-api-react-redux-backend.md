---

title: "Connecting a RESTful API with React and Redux - The Backend"
date: "2018-06-14"
---

So you're familiar with frontend technology and want to learn a bit more about the backend; or, you're just wanting to learn how to get started with Fullstack Development?

<!-- end -->

Well this post will show you just how to get started with that by setting things up on the backend before switching to React and doing everything else like AJAX with Redux and whatnot. If you're more interested in how to do AJAX calls with Redux, you can skip to [here](/)

(_This assumes you have **some** knowledge of Node.js, MongoDB, and definitely assumes you know at least the fundamentals of how React and Redux work for when we move on to the frontend._)

(_Note: You can view the source code [HERE](https://github.com/tylergreulich/restful-api-react--blog)_)

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

Starting off, go ahead and navigate to a directory of your choosing and run

`npm init --yes`

Once you've been through everything that follows with the command you can go ahead and install the dependencies that will be required for the set up

`npm i express mongoose body-parser concurrently`

Before we continue, inside of `package.json`, create these scripts:

```
"scripts": {
  "client": "cd client && npm run start",
  "server": "nodemon server.js",
  "dev": "concurrently \"npm run server\" \"npm run client\""
},
```

Now you can make a file called `server.js`, `index.js` or whatever you'd like to call it in the root directory, but those two file names are the defacto standard (_from what I've seen, at least_) when it comes to Nodejs.

In that new file you created, let's go ahead and initialize the server and get started.

---

## Nodejs and Express

There are many ways you can set this boilerplate up (_and if you already have a preferred way of doing so, I encourage that you go with that as opposed to my own, just for the sake of familiarity_), this is just one of many ways.

In server.js

```
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
```

You might be looking at `const express = require('express)`, and `const mongoose = require('mongoose')` and be wondering, what the heck is that?

Well, Express is just a framework for Nodejs to make setting up RESTful APIs much easier and a much more pleasurable experience overall. Mongoose is an ODM (Object Data Modeling) library for MongoDB and Nodejs. It's what's being used in this particular scenario to give us the option to store JSON documents. You can read more about it [here](http://mongoosejs.com/)

As far as `body-parser` is concerned, that's just the boilerplate that will give us access to the `req.body` for when we set up our routes.

If you're confused as to why we're using this syntax to import our modules, it's because Node only supports the CommonJS syntax out of box. You can get around this by setting up [Babel](https://babeljs.io/), but that's for another time.

It is however the same thing as doing `import express from 'express'` if you're more comfortable with React.

Next, create a folder called `routes` in the root directory and make a file called `movies.js`

In movies.js

```
const express = require('express');
const mongoose = require('mongoose');
const app = express.Router();

const Movie = require('../models/movie.js');

router.get('/', (req, res) => {
  Movie.find()
    .sort({ date: -1 })
    .then(movie => res.json(movie))
    .catch(err => res.json(err));



router.put('/:id', (req, res) => {
  const { name, description, releaseDate } = req.body;
  Movie.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name,
        description,
        releaseDate
      }
    },
    { new: true }
  )
    .then(movie => res.json(movie))
    .catch(err => res.status(404).json({ id: 'No movie found with that ID' }));
});



router.post('/', (req, res) => {
  const { name, description, releaseDate } = req.body;
  const newMovie = new Movie({
    name,
    description,
    releaseDate
  })
    .save()
    .then(movie => res.json(movie))
    .catch(err => res.json(err));
});



router.delete('/:id', (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(movie => res.json(movie))
    .catch(err => res.status(404).json({ id: 'No movie found with that ID' }));
});


module.exports = router;
});
```

On `line 2` , we're initializing the Express router and assigning it to a variable called `app` in this case, and then exporting it at the bottom of the file.

If you're wondering where `const Movie = require('../models/movie.js');` is coming from, well, we'll be getting to that shortly. Just know that it has to do with mongoose and how you set up the data model and schema for whatever kind of data you want to store in MongoDB.

Everything else like `router.get, router.put` etc are just your basic CRUD commands. You make GET requests to receive data, PUT requests to update, POST requests to create, and DELETE requests to delete.

Let's go back into `server.js` and import our newly created Express router.

```
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const movieRouter = require('./routes/movies.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/movies', movieRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
```

Well, that about wraps things up for Express. We're not done yet though, because we still need to do all the setup for the database, which won't take too long at all.

---

## Mongoose and MongoDB

We're going to be using [MLab](https://mlab.com/) for this, but if you know your way around MongoDB Compass and doing things locally, you're more than welcome to.

You can sign up for an MLab account [here](https://mlab.com/signup/).

Once that's done, go ahead and follow along so we can set up our Mongo database.

![MLab 01](https://i.imgur.com/h2aJchQ.png)

![Mlab 02](https://i.imgur.com/ogW64Fy.png)

After that, choose whichever location is closest to you and hit `continue`, and then enter a database name in the following screen and hit `continue` once more, and then `submit order` for your free Mongo database!

On the the following screen where it says `MongoDB Deployments` and under that, click on your new deployed database name. It should have a nice green checkmark next to it with a circle going around it.

Now let's finish this up by creating a new user for our database so we can connect to our database using our MongoDB connection string!

![Mlab 03](https://i.imgur.com/82HbGik.png)

**Important!** When you enter the details for creating the new user for your database, make sure you write them down somewhere so you don't forget them, as you'll need it to use the connection string to access your database.

![Mlab 04](https://i.imgur.com/3Tngx0s.png)

Replace `<dbuser>:<dbpassword>` in this connection string with the credentials you just created. As an example, the string would be changed to

```
mongodb://exampleUser:examplePassword@ds259250.mlab.com:59250/movies-blog
```

Finally, let's take this string and connect to our database in our Express server!

In server.js

```
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const movieRouter = require('./routes/movies.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/movies', movieRouter);

mongoose
  .connect('mongodb://exampleUser:examplePassword@ds259250.mlab.com:59250/movies-blog')
  .then(res => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
```

_Note: When you go to deploy for production, you're going to want to store all of your API keys and other information in a separate file and the import it when needed and reference that information there, with an accompanying .gitignore file_

Once that's done, you should be able to connect to your database with no problems.

Let's go create a new folder now in the root directory called `models/movie.js` so we can wrap things up.

In movie.js

```
const mongoose = require('mongoose');

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    releaseDate: {
      type: String,
      required: true
    }
  })
);

module.exports = Movie;
```

What's happening here is we're defining the schema to map our data to a new MongoDB collection, and then exporting it so we can use that schema in whatever files we need for our RESTful service.

If you want to read more about Mongoose schemas and models, go [here](http://mongoosejs.com/docs/guide.html)

---

Well, that's about it for this week. Next time I'll be explaining how to set up React with Redux and then how to set it up to do API calls with our nearly created RESTful API.
