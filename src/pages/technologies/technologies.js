import React from 'react'
import './Technologies.sass'
import { ReactLogo } from '../svgIcons'
import { ReduxLogo } from '../svgIcons'
import { GraphQLLogo } from '../svgIcons'
import { Node } from '../svgIcons'
import { Vue } from '../svgIcons'
import { Mongo } from '../svgIcons'

const technologies = () => {
  return (
    <div>
      <section className="technology">
        <h2 className="technology__technologies">currently learning</h2>
        <section className="technology__container">
          <span className="technology__container--icons">
            {ReactLogo}
            <p data-hover="React Native">React</p>
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
            {Vue}
            <p>Vuejs</p>
          </span>
          <span className="technology__container--icons">
            {Mongo}
            <p>MongoDB</p>
          </span>
        </section>
      </section>
    </div>
  )
}

export default technologies
