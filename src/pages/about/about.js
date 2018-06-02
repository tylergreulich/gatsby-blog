import React, { Component } from 'react'
import './about.sass'
import { JavaScript, Book, Music, Quill } from '../svgIcons'

export default class About extends Component {
  state = {
    input: '',
  }
  render() {
    return (
      <div>
        <span style={{ textAlign: 'center' }}>
          <h2 className="h2styles">about</h2>
        </span>
        <section className="about__container">
          <figure className="about__container--cards">
            <span className="about__container--icons">{JavaScript}</span>
            <figcaption className="about__container--captions">
              <h3>coding</h3>
            </figcaption>
          </figure>

          <figure className="about__container--cards">
            <span className="about__container--icons">{Music}</span>
            <figcaption className="about__container--captions">
              <h3>music</h3>
            </figcaption>
          </figure>

          <figure className="about__container--cards">
            <span className="about__container--icons">{Book}</span>
            <figcaption className="about__container--captions">
              <h3>reading</h3>
            </figcaption>
          </figure>

          <figure className="about__container--cards">
            <span className="about__container--icons">{Quill}</span>
            <figcaption className="about__container--captions">
              <h3>writing</h3>
            </figcaption>
          </figure>
        </section>
      </div>
    )
  }
}
