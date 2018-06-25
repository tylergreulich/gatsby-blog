import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Img from 'gatsby-image'

const StyledNavLinks = styled(Link)`
  font-weight: 500;
`

const StyledHeader = StyledNavLinks.extend`
  font-size: 2.4rem;
  padding-bottom: 1rem;
`

const HeaderWrapper = styled.div`
  margin-bottom: 1.45rem;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ isHome }) => (isHome ? '70vh' : '20vh')};
  h1 {
    img {
      height: 80px;
    }
  }
`

const HeaderContainer = styled.div`
  padding: 1.45rem 1.0875rem;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 13rem;
`

const MainNav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    li {
      font-family: Lato;
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

const LinkContainer = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-left: 0;
`

class Header extends Component {
  render() {
    const { siteTitle, data, location } = this.props
    return (
      <HeaderWrapper
        isHome={location.pathname === '/'}
        ref={wrapper => (this.wrapper = ReactDOM.findDOMNode(wrapper))}
      >
        <HeaderContainer>
          <h1 style={{ margin: 0 }}>
            <StyledHeader
              to="/"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              {siteTitle}
            </StyledHeader>
          </h1>
          <MainNav>
            <LinkContainer>
              <li>
                <StyledNavLinks to="/blog">Blog</StyledNavLinks>
              </li>
              <li>
                <StyledNavLinks to="/portfolio">Portfolio</StyledNavLinks>
              </li>
            </LinkContainer>
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
          imgStyle={{ objectFit: 'unset' }}
        />
      </HeaderWrapper>
    )
  }
}

export default Header
