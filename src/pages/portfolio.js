import React, { Component } from 'react'
import styled from 'styled-components'
import awsQuiz from '../images/sfw.png'
import movieDB from '../images/moviedb.png'
import GitHub from '../images/GitHub-Mark.svg'

const PortfolioHeading = styled.h2``

const PortfolioContainer = styled.section`
  display: grid;
  grid-template: 1fr 1fr / repeat(3, 1fr);
  grid-gap: 2rem;
`

const PortfolioItem = styled.figure`
  text-align: center;
`

export default class About extends Component {
  render() {
    return (
      <div>
        <PortfolioHeading>Here are some of my projects</PortfolioHeading>

        <PortfolioContainer>
          <PortfolioItem>
            <span>AWS Quiz App</span>
            <a
              target="_blank"
              href="https://ecstatic-gates-298e4a.netlify.com/"
            >
              <img src={awsQuiz} style={{ cursor: 'pointer' }} />
            </a>
            <a
              href="https://github.com/tylergreulich/aws_quiz_app"
              target="_blank"
            >
              <img
                src={GitHub}
                alt=""
                style={{ height: '4rem', margin: '1rem 0' }}
              />
            </a>

            <figcaption>
              Technologies used: <strong>React, React Router, Redux </strong>
            </figcaption>
          </PortfolioItem>
          <PortfolioItem>
            <span>Lightweight Movie Database</span>
            <a
              target="_blank"
              href="https://admiring-golick-7882c0.netlify.com/#/"
            >
              <img src={movieDB} style={{ cursor: 'pointer' }} />
            </a>
            <a href="https://github.com/tylergreulich/moviql" target="_blank">
              <img
                src={GitHub}
                alt=""
                style={{ height: '4rem', margin: '1rem 0' }}
              />
            </a>

            <figcaption>
              Technologies used:{' '}
              <strong>React, React Router, Node, MongoDB, GraphQL</strong>
            </figcaption>
          </PortfolioItem>
        </PortfolioContainer>
      </div>
    )
  }
}
