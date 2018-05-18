import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

const IndexPage = ({ data }) => (
  <div>
    <h1>Hi people</h1>
    <Img sizes={data.background.sizes} />
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
  </div>
)

export default IndexPage

export const query = graphql`
  query SiteQuery {
    site {
      siteMetadata {
        title
      }
    }
    background: imageSharp(id: { regex: "/dawn-dusk-optimized.png/" }) {
      sizes(maxWidth: 1920) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
