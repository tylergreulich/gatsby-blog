import React from 'react'
import Link from 'gatsby-link'
import About from './about/about'
import Technologies from './technologies/technologies'
import Writing from './writing/writing'
import Portfolio from '../pages/portfolio'

const IndexPage = ({ data }) => (
  <div>
    <About />
    <Technologies />
    <Writing />
    <Portfolio />
  </div>
)

export default IndexPage
