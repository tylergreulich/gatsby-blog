---
title: "Creating a Blog with GatsbyJS - Part Two"
date: "2018-05-28"
---

Last week we started working on making a blog and even made some changes to it, such as swapping the default styles with the header with a new image. This week, I'll be showing you how you can start to create Blog posts with Gatsby using GraphQL!

<!-- end -->

If you missed the previous post, you can catch up [here](https://github.tylergreulich.io/posts)

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

Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum animi doloremque quod quia inventore architecto iste aut, aliquid tempore praesentium, repellat deleniti eaque ipsa reprehenderit reiciendis, consequuntur commodi tempora. Eligendi, deleniti totam esse, eaque cumque cupiditate culpa quam alias ipsa quibusdam dolorem repellendus atque maiores, dicta labore consequuntur itaque voluptates!

* This
* Is

Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum animi doloremque quod quia inventore architecto iste aut, aliquid tempore praesentium, repellat deleniti eaque ipsa reprehenderit reiciendis, consequuntur commodi tempora. Eligendi, deleniti totam esse, eaque cumque cupiditate culpa quam alias ipsa quibusdam dolorem repellendus atque maiores, dicta labore consequuntur itaque voluptates!

* A
* New
* Post


Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum animi doloremque quod quia inventore architecto iste aut, aliquid tempore praesentium, repellat deleniti eaque ipsa reprehenderit reiciendis, consequuntur commodi tempora. Eligendi, deleniti totam esse, eaque cumque cupiditate culpa quam alias ipsa quibusdam dolorem repellendus atque maiores, dicta labore consequuntur itaque voluptates!
```

Now before we can make this readable for Gatsby we have to go into GraphQL and start working on a query (see [GraphQL Docs](https://graphql.org/learn/queries/)).

_You can find the source code and files from this github repo *THAT I NEED TO CREATE*_

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
          id
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
          id
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

Let's start off by making a new folder `/src/posts` and move `post.md` inside of it. Next, create another folder and add a new component inside of `/src/components/Posts/PostListing.js`.

You can go ahead and put the following code inside of the file

```
import React from 'react'
import Link from 'gatsby-link'

const postListing = ({ post }) => {
  return (
    <article>
      <h3>{post.frontmatter.title}</h3>
      <span>{post.frontmatter.date}</span>
      <div
        dangerouslySetInnerHTML={{
          __html: post.html,
        }}
      />
    </article>
  )
}

export default postListing
```

_Note: dangerouslySetInnerHTML in this case isn't, well, as dangerous as it may seem._ This is just to give Gatsby the power to render out the actual content and not the HTML elements that come out of the markdown files.

Anyways, then change `/src/pages/index.js` to

```
import React from 'react'
import Link from 'gatsby-link'
import PostListing from '../components/Posts/PostListing'

const IndexPage = ({ data }) => (
  <div>
    <h2>Posts</h2>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <PostListing post={node} key={node.id} />
    ))}
  </div>
)

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
          id
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

I'd be lying if I said that was it, but there's a lot more code to go before Gatsby is configured properly to start setting up routes to different blog posts instead of just having all the content on a single page. Trust me, it's worth it!

---

## Setting up Context Queries

This is the final part before all the files _should_ be set up the right away so you can begin to use your new powerful static site generator! There are of course a plethora of other ways you could do this but I'm just going to show one of many.

Speaking of a lot more code, let's finished up the last few adjustments that need to be made, starting with `gatsby-node.js`

```
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'posts',
    })
    createNodeField({
      node,
      name: 'slug',
      value: `/posts${slug}`,
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/posts/PostPage.js'),
          context: {
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}
```

If you want an explanation of what's going on here, you can see the [Gatsby Node API](https://www.gatsbyjs.org/docs/node-apis/). I'm not going to bother with trying myself, because this isn't a guide on the inner mechanisms of how Gatsby works under the hood, sorry!

Create a new component in the `/src/posts` directory, called `PostPage.js`

```
import React, { Component } from 'react'

export default class PostPage extends Component {
  render() {
    const { data } = this.props
    return <div>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <span>{data.markdownRemark.frontmatter.date}</span>
      <div
        dangerouslySetInnerHTML={{
          __html: data.markdownRemark.html,
        }}
      />
      </div>
  }
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`
```

Next edit `/src/pages/index.js`

```
import React from 'react'
import Link from 'gatsby-link'
import PostListing from '../components/Posts/PostListing'

const IndexPage = ({ data }) => (
  <div>
    <h2>Posts</h2>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <PostListing post={node} key={node.id} />
    ))}
  </div>
)

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
          id
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
          html
        }
      }
    }
  }
`
```

Finally, make one last revision to `/src/components/Posts/PostListing.js` and we should be finished.

```
import React from 'react'
import Link from 'gatsby-link'

const postListing = ({ post }) => {
  return (
    <article>
      <h3><Link to={post.fields.slug}>{post.frontmatter.title}</Link></h3>
      <span>{post.frontmatter.date}</span>
    </article>
  )
}

export default postListing
```

And that should be it! You should now have a fully-functional blog with routing to redirect to each individual blog post.

If you wanted to read more about Gatsby and how you can add more functionality to your blog, I'd recommend giving their documentation a read [here](https://www.gatsbyjs.org/docs/).

---

## As a recap for this post, we covered:

* How to use gatsby-transformer-remark to convert markdown to html
* Using GraphQL queries to pull data from each post
* Working with Gatsby and setting it up so it can render the content
* Having dynamic routing with gatsby-link to redirect to each blog post

In the next post, I'll share some tips as to how you can get better at React by writing cleaner, more concise code, and share some things you may or may not have known about React.
