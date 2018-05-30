import React, { Component } from 'react'

export default class About extends Component {
  state = {
    input: '',
  }
  render() {
    return (
      <div>
        <h1>About Me</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus iusto earum consectetur quasi optio eligendi non illo nobis tenetur possimus?
        </p>
      </div>
    )
  }
}
