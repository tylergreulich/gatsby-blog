import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Link from 'gatsby-link'
import HeaderImage from '../images/dawn-dusk-optimized.png'
import styled from 'styled-components'
import Img from 'gatsby-image'

const HeaderWrapper = styled.div`
  /* background: rebeccapurple; */
  margin-bottom: 1.45rem;
  position: relative;
  overflow: hidden;
  height: ${({ isHome }) => (isHome ? '70vh' : '20vh')};
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
`

class Header extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    const { location } = this.props
    if (location.pathname !== prevProps.location.pathname) {
      if (this.props.location.pathname === '/') {
        this.wrapper.animate([{ height: '20vh' }, { height: '70vh' }], {
          duration: 400,
          fill: 'forwards',
          easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
          iterations: 1,
        })
      } else {
        this.wrapper.animate([{ height: '70vh' }, { height: '20vh' }], {
          duration: 400,
          fill: 'forwards',
          easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
          iterations: 1,
        })
      }
    }
  }

  render() {
    const { siteTitle, data, location } = this.props
    return (
      <HeaderWrapper
        isHome={location.pathname === '/'}
        ref={wrapper => (this.wrapper = ReactDOM.findDOMNode(wrapper))}
      >
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
              {/* <img src={var} alt=""/> logo goes here */}
            </Link>
          </h1>
          <nav>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
            </ul>
          </nav>
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
