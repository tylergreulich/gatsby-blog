import React, { Component } from 'react'

export default class PostPage extends Component {
  render() {
    const { data } = this.props
    const { title, date } = data.markdownRemark.frontmatter
    const { html: __html } = data.markdownRemark
    return (
      <div>
        <span>{date}</span>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html }} />
      </div>
    )
  }
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`
