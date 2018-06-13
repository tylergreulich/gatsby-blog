import React from 'react'
import './writing.sass'
import PostListing from '../../components/Posts/PostListing'
import Link from 'gatsby-link'
import styled from 'styled-components'

const StyledRedirect = styled(Link)`
  text-decoration: none;
  height: 100%;
`

const writing = ({ data }) => (
  <div>
    <section className="writing">
      <h2 className="writing__headline">recently written</h2>
      <section className="writing__container">
        <StyledRedirect to="/posts/">
          <figure>
            <h2>Connecting a RESTful API with React and Redux</h2>
          </figure>
        </StyledRedirect>
        <StyledRedirect to="/posts/react-tips-for-getting-better-at-react/">
          <figure>
            <h2>5 Tips for Getting Better At React</h2>
          </figure>
        </StyledRedirect>
        <StyledRedirect to="/posts/creating-blog-gatsbyjs-part-two/">
          <figure>
            <h2>Creating a Blog with GatsbyJS - Part Two</h2>
          </figure>
        </StyledRedirect>
        <StyledRedirect to="/posts/creating-blog-gatsbyjs-part-one/">
          <figure>
            <h2>Creating a Blog with GatsbyJS - Part One</h2>
          </figure>
        </StyledRedirect>
      </section>
    </section>
  </div>
)

export default writing
