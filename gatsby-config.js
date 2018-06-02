module.exports = {
  siteMetadata: {
    title: 'Tyler Greulich',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: `<!-- end -->`,
      },
    },
    {
      resolve: `gatsby-remark-images`,
      options: {
        maxWidth: 590,
      },
    },
    'gatsby-transformer-sharp',
  ],
}

// pathprefix: '/tylergreulich',
