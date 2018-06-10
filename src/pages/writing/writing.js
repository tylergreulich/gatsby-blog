import React from 'react'
import './writing.sass'
import PostListing from '../../components/Posts/PostListing'
import Link from 'gatsby-link'
import styled from 'styled-components'

const StyledRedirect = styled(Link)`
  text-decoration: none;
`

const writing = ({ data }) => (
  <div>
    <section className="writing">
      <h2 className="writing__headline">recently written</h2>
      <section className="writing__container">
        <figure>
          <StyledRedirect to="/posts/react-tips-for-getting-better-at-react/">
            <h2>CHANGE THIS LINK</h2>
          </StyledRedirect>
        </figure>
        <figure>
          <StyledRedirect to="/posts/react-tips-for-getting-better-at-react/">
            <h2>Tips for Getting Better At React</h2>
          </StyledRedirect>
        </figure>
        <figure>
          <StyledRedirect to="/posts/react-tips-for-getting-better-at-react/">
            <h2>Creating a Blog with GatsbyJS - Part Two</h2>
          </StyledRedirect>
        </figure>
        <figure>
          <StyledRedirect to="/posts/react-tips-for-getting-better-at-react/">
            <h2>Creating a Blog with GatsbyJS - Part One</h2>
          </StyledRedirect>
        </figure>
      </section>
    </section>
  </div>
)

export default writing
