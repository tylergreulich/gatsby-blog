import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Link from 'gatsby-link'
import HeaderImage from '../images/dawn-dusk-optimized.png'
import styled from 'styled-components'
import Img from 'gatsby-image'

const StyledNavLinks = styled(Link)`
  font-weight: 500;
`

const HeaderWrapper = styled.div`
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
  display: flex;
  justify-content: space-between;
`

const MainNav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    li {
      margin-left: 10px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      a {
        text-decoration: none;
        color: #eee;
        &:hover {
          border-bottom: 3px solid rgb(221, 153, 63);
        }
      }
    }
  }
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
            <StyledNavLinks
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
              {siteTitle}
              {/* <img src={var} alt=""/> logo goes here */}
            </StyledNavLinks>
          </h1>
          <MainNav>
            <ul>
              <li>
                <StyledNavLinks to="/about">About</StyledNavLinks>
              </li>
              <li>
                <StyledNavLinks to="/portfolio">Portfolio</StyledNavLinks>
              </li>
            </ul>
          </MainNav>
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
