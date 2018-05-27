import React, { Component } from 'react'
import styled from 'styled-components'

const PortfolioHeading = styled.h2``

const PortfolioContainer = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 20rem;
  width: 20rem;

  > figure {
    width: 20%;
  }
`

export default class About extends Component {
  render() {
    return (
      <div>
        <PortfolioHeading>Here are some of my projects</PortfolioHeading>

        <PortfolioContainer>
          <figure>1</figure>
          <figure>2</figure>
          <figure>3</figure>
          <figure>4</figure>
          <figure>5</figure>
        </PortfolioContainer>
      </div>
    )
  }
}
