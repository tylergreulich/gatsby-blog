---

title: "Connecting a RESTful API with React and Redux - The Frontend"
date: "2018-06-23"
---

If you read the previous post, you should have a good idea of what this one will be about. If you're just curious how to hook up Redux to a RESTful API and don't want to bother with building the backend, then read along!

<!-- end -->

If you missed the last post and are wondering how the backend was set up, you can look [here](/).

It's just a relatively simple RESTful API built with Nodejs, Express, and MongoDB. So if you already know how to build APIs and are here for how the frontend works with React, or more specifically React and Redux, then look below.

(_This assumes you have knowledge of how React and Redux work and/or know how to do API calls with Axios or the Fetch API._)

(\_Note: You can view the source code [I NEED TO CREATE A LINK]()

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

This is just some boilerplate that comes from Facebook, the creators of React, and will create a quick setup to help get things going so you don't have to configure webpack and all the other tedious things that come with the process.

Next, cd into the client folder and let's start installing some of the other additional dependencies!

`npm i axios redux react-redux redux-thunk`

The axios module, if you're not familiar with it, is for making AJAX requests (of course you could use the Fetch API, this is just what I prefer).

The other three packages are for connecting [Redux](/link-to-redux) to React, as Redux itself is not a package that was created just _for_ React, but can be used with other frameworks as well. More specifically I'm talking about the `react-redux` package.

Now `redux-thunk` is middleware (if know some language or framework like Node / Express, this is pretty much _exactly_ the same as what middleware is used for the backend) that lets us handle async data coming from another API. In this case, it's pretty paramount.

## Setting up Redux with React

(_Note: If you already have a way you prefer to set Redux up with React then by all means go with what you're most comfortable with. This is just how I like to set things up personally_)
