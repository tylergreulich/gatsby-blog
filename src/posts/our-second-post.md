---
title: "Creating a Blog with GatsbyJS - Part Two"
date: "May 28 2018"
---

Last week we started working on making a blog and even made some changes to it, such as swapping the default styles with the header with a new image. This week, I'll be showing you how you can start to create Blog posts with Gatsby using GraphQL!

<!-- end -->

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

pre {
  background: #eee
}

code {
  background: #eee
}
</style>

# Creating a blog with GatsbyJS - Part Two

_Note: this assumes at least some knowledge of GraphQL and writing queries in the GraphiQL interface_

Now before we get started, you'll have to install _another_ plugin from Gatsby with `npm i --save gatsby-transformer-remark`. This is so we can set up the proper configuration with GraphQL and begin to add content to this page, aside from just having some basic routing set up.

While it's installing you can add it to your `gatsby-config.js` file like so

```jsx
module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: `<!-- end -->`,
      },
    },
    {
      resolve: `gatsby-remark-images`,
      options: {
        maxWidth: 590,
      },
    },
    'gatsby-transformer-sharp',
  ],
}
```

Afterwards create a file called `post.md` in `/src/pages` and add the following to it:

```m
---
title: "Welcome to the new blog"
date: "5/27/2018"
---

## Hello

* This
* Is
* A
* New
* Post
```

Now before we can make this readable for Gatsby we have to go into GraphQL and start working on a query (see [GraphQL Docs](https://graphql.org/learn/queries/)).

---

## Writing GraphiQL Queries

If it isn't already, go into your terminal and make sure your development server is running. You should see a message that says something like this

![GraphiQL Terminal Message](https://i.imgur.com/m3Gcbec.png)

Head over to [localhost:8000/\_\_\_graphiql](localhost:8000/graphiql) (in my case it's localhost:8001 because I already had a server running from before) and let's start writing some queries from the GUI!

This will be a bit hairy and may be a little complicated just because the way you have to set things up isn't exactly the most straight forward, even if you know the GraphiQL interface. If you have experience with writing queries in GraphiQL and / or GraphQL, then great! This will probably look really familiar.

Anyways, throw this in the left window of the GUI and let's get started.

```
query DataTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            date
          }
          html
        }
      }
    }
  }
```

What this is essentially doing is whenever you make a new `.md` file, you're using this query to pull the data that's inside of that file and transforming it into a blog post. This query in particular is pulling the title, date, and html from each markdown file you create.

If you know CRUD operations (_Create, Read, Update, Delete_) you can think of a query in GraphQL as just reading data from the post that you created.

Now press the giant play button near the top of the screen and you should see the following (_or something really similar!_) in the adjacent window:

```
{
  "data": {
    "site": {
      "siteMetadata": {
        "title": "Gatsby Default Starter"
      }
    },
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "frontmatter": {
              "title": "Welcome to the new blog",
              "date": "5/27/2018"
            },
            "html": "<h2>Hello</h2>\n<ul>\n<li>This</li>\n<li>Is</li>\n<li>A</li>\n<li>New</li>\n<li>Post</li>\n</ul>"
          }
        }
      ]
    }
  }
}
```

Now what we can do is copy the query we wrote from above inside of the left window, and paste it inside of `/src/pages/index.js`

```javascript
import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => (
  <div>
    <h1>Hi people</h1>
    <p>{data.site.siteMetadata.title}</p>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <PostListing post={node} key={node.id} />
    ))}
  </div>
)

const PostListing = () => <div>Hello</div>

export default IndexPage

export const query = graphql`
  query DataTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            date
          }
          html
        }
      }
    }
  }
`
```

Go ahead and restart the development server if you have to; if not, then let's move on and start to work on creating markdown files and transforming them into actual blog posts!

---

## Working with Markdown Posts
