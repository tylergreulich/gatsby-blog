import React, { Component } from 'react'
import './about.sass'
import { JavaScript, Book, Music, Quill } from '../svgIcons'
import Link from 'gatsby-link'

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
              <p>
                One of my favorite things to do, if not my favorite thing to do
                is coding and programming.
              </p>
            </figcaption>
          </figure>

          <figure className="about__container--cards">
            <span className="about__container--icons">{Music}</span>
            <figcaption className="about__container--captions">
              <h3>music</h3>
              <p>
                There's usually music accompanying me while I code, with my most
                listened to genre being Lofi.
              </p>
            </figcaption>
          </figure>

          <figure className="about__container--cards">
            <span className="about__container--icons">{Book}</span>
            <figcaption className="about__container--captions">
              <h3>reading</h3>
              <p>
                If it isn't coding, more often than not I find myself reading
                fantasy novels and articles about coding.
              </p>
            </figcaption>
          </figure>

          <figure className="about__container--cards">
            <span className="about__container--icons">{Quill}</span>
            <figcaption className="about__container--captions">
              <h3>writing</h3>
              <p>
                And if it isn't reading, I'm usually writing about code. You can
                see some of the things I've written <Link to="/blog">here</Link>
              </p>
            </figcaption>
          </figure>
        </section>
      </div>
    )
  }
}
