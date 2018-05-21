---
title: "Creating a Blog with GatsbyJS"
date: "May 19 2018"
---

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
</style>

<!-- end -->

# Creating a Blog with GatsbyJS

So, you want to create a blog but aren't sure which static site generator to choose from, whether it be something like [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), or [GatsbyJS](https://www.gatsbyjs.org/)?

Well I can't say that I know the two other than Gatsby, but if you know React and know or are interested in learning [GraphQL](https://dev-blog.apollodata.com/graphql-vs-rest-5d425123e34b), then you'll feel right at home with GatsbyJS.

_All of the source code can be found at this github repo that **I NEED TO MAKE**_

---

## Getting Started

### Installing the CLI

Starting off, ensure that you have node and npm installed (go [here](https://www.npmjs.com/get-npm) if you don't), I'll be using Node v8.9.4 and npm v5.6.0. Install the command line interface (or CLI for short) with `npm i -g gatsby-cli`.

When the CLI is installed, navigate to a directory where you'd like to start your project and run `gatsby new my-new-blog`. This will install the default [Gatsby project](https://github.com/gatsbyjs/gatsby-starter-default) (but keep in mind that there are [others](https://www.gatsbyjs.org/docs/gatsby-starters/) to choose from if you want).

Note that not only does the Gatsby CLI create the project for us though, but it also comes with a number of commands in the `package.json` for development and building for production.

---

## Running the Server for Development

Now run `gatsby develop` and visit [http://localhost:8000]() to see the hot-reloading development environment! You should be looking at this

![Gatsby Starter](https://i.imgur.com/ZXcyiMY.png)

Now you have a blog! Kinda. Maybe not exactly, but we're getting there. Kudos for the Gatsby team for making it so easy to get a site up and running in a useful development phase.

When you open the root directory of your project, you'll notice that you have several Gatsby-prefixed files. More specifically, `gatsby-config.js` and `gatsby-node.js`.

`gatsby-config.js` is where you'll go to import and set up all of the plugins you install for your project. `gatsby-node.js` is where you configure the more technical side of things when it comes to making part of the blog functional.

Let's start to modify the header of the home page by replacing it with an image. We'll be making use of [Styled Components](https://www.styled-components.com/) for taking care of the CSS, so I'll be assuming at least a little knowledge of it.

Install the necessary plugins and packages with:

    npm i gatsby-image gatsby-plugin-sharp gatsby-plugin-styled-components gatsby-source-filesystem gatsby-transformer-remark gatsby-transformer-sharp gatsby-image styled-components

## Modifying the Header

First, open `gatsby-config.js` and load the plugins:

```module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/images`,
      },
    },

    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
}
```

Now change what's in `src/layouts/index.js` so we can change the data that inside of the `/src/components/header` component

```import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
import './index.css'

const Layout = ({ children, data, location }) => (
  <div>
    <Helmet
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header
      siteTitle={data.site.siteMetadata.title}
      location={location}
      data={data}
    />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
    background: imageSharp(id: { regex: "/name-of-image-here.png" }) {
      sizes(maxWidth: 1920) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
```

Where it says `background: imageSharp(id: { regex: "name-of-image-here.png" })` put whatever image you want to use in `/src/images` and replace the name.

Next, we'll alter `/src/components/header.js` and start making use of Styled Components!

```import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Link from 'gatsby-link'
import HeaderImage from '../images/name-of-your-image'
import styled from 'styled-components'
import Img from 'gatsby-image'

const HeaderWrapper = styled.div`
  margin-bottom: 1.45rem;
  position: relative;
  overflow: hidden;
  h1 {
    img {
      height: 80px;
    }
  }
`

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 960;
  padding: 1.45rem 1.0875rem;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
`

class Header extends Component {

  render() {
    const { siteTitle, data, location } = this.props
    return (
      <HeaderWrapper>
        <HeaderContainer>
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
              {siteTitle}
            </Link>
          </h1>
        </HeaderContainer>
        <Img
          sizes={data.background.sizes}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'unset',
          }}
          imgStyle={{
            objectFit: 'unset',
          }}
        />
      </HeaderWrapper>
    )
  }
}

export default Header
```

Additonally we've added Gatsby's `Link` component to our `Header` component and added a little bit of styling. Not the fanciest thing in the world, but not an eyesore either!

If you receieved any errors in your terminal during the process, close Gatsby and restart the development server with `gatsby develop`.

### Well I think that's going to be it for this week - just to recap, we have:

    * Installed the Gatsby CLI
    * Created a new project
    * Ran the development server
    * Changed the header for the blog

Stay tuned next week where I'll introduce GraphQL with GatsbyJS and how you can start to make blog posts with it!
