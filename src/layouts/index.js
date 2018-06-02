import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from '../components/header'
import './index.css'
import ReallySmoothScroll from 'really-smooth-scroll'
import { HashRouter, withRouter } from 'react-router-dom'

ReallySmoothScroll.shim()

class Layout extends Component {
  render() {
    const { data, location, children, history } = this.props
    history.listen(() => {
      window.scrollTo(0, 0)
    })
    return (
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
  }
}

Layout.propTypes = {
  children: PropTypes.func,
}

export default withRouter(Layout)

export const query = graphql`
  query SiteTitleQuery {
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
