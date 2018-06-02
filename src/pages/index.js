import React from 'react'
import Link from 'gatsby-link'
import About from './about/about'
import Technologies from './technologies/technologies'
import Writing from './writing/writing'

const IndexPage = ({ data }) => (
  <div>
    <About />
    <Technologies />
    <Writing />
  </div>
)

export default IndexPage
