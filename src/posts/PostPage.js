import React, { Component } from 'react'
import styled from 'styled-components'

const StyledTitle = styled.span`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`

const StyledDate = StyledTitle.extend`
  font-size: 1rem;
`

export default class PostPage extends Component {
  render() {
    const { data } = this.props
    const { title, date } = data.markdownRemark.frontmatter
    const { html: __html } = data.markdownRemark
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledTitle>
            <strong>{title}</strong>
          </StyledTitle>
          <StyledDate>
            <strong>{date}</strong>
          </StyledDate>
        </div>

        <hr />
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
        date(formatString: "MMMM DD YYYY")
      }
    }
  }
`
