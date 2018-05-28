import React, { Component } from 'react'
import styled from 'styled-components'
import awsQuiz from '../images/sfw.png'
import react from '../images/react.svg'
import reactRouter from '../images/react-router.png'

const PortfolioHeading = styled.h2``

const PortfolioContainer = styled.section`
  display: grid;
  grid-template: 1fr 1fr / repeat(3, 1fr);
`

export default class About extends Component {
  render() {
    return (
      <div>
        <PortfolioHeading>Here are some of my projects</PortfolioHeading>

        <PortfolioContainer>
          <figure style={{ textAlign: 'center' }}>
            <span>AWS Quiz App</span>
            <a
              target="_blank"
              href="https://ecstatic-gates-298e4a.netlify.com/"
            >
              <img src={awsQuiz} style={{ cursor: 'pointer' }} />
            </a>
            <figcaption>
              Technologies used: <strong>React, React Router, Redux </strong>
            </figcaption>
          </figure>
        </PortfolioContainer>
      </div>
    )
  }
}
