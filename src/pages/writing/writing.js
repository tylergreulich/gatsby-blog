import React from 'react'
import './writing.sass'
import PostListing from '../../components/Posts/PostListing'
import Link from 'gatsby-link'

const writing = ({ data }) => (
  <div>
    <section className="writing">
      <h2 className="writing__headline">recently written</h2>
      <section className="writing__container">
        <figure>
          <Link to="/posts/creating-blog-gatsbyjs-part-two/">
            <h2>Creating a Blog with GatsbyJS - Part Two</h2>
          </Link>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
            libero eum natus molestias, quia explicabo...
          </p>
        </figure>
      </section>
    </section>
  </div>
)

export default writing
