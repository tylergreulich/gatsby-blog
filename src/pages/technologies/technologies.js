import React from 'react'
import './Technologies.sass'
import {
  ReactLogo,
  ReduxLogo,
  GraphQLLogo,
  Node,
  Jest,
  Mongo,
} from '../svgIcons'

const technologies = () => (
  <div>
    <section className="technology">
      <h2 className="technology__technologies">currently learning</h2>
      <section className="technology__container">
        <span className="technology__container--icons">
          {ReactLogo}
          <p>React</p>
        </span>
        <span className="technology__container--icons">
          {ReduxLogo}
          <p>Redux</p>
        </span>
        <span className="technology__container--icons">
          {GraphQLLogo}
          <p>GraphQL</p>
        </span>
        <span className="technology__container--icons">
          {Node}
          <p>Nodejs</p>
        </span>
        <span className="technology__container--icons">
          {Mongo}
          <p>MongoDB</p>
        </span>
        <span className="technology__container--icons">
          {Jest}
          <p>Jest</p>
        </span>
      </section>
    </section>
  </div>
)

export default technologies
