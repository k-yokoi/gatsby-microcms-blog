import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const node = data.microcmsBlog
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={node.title}
        description={node.description}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{node.title}</h1>
          <p>{node.publishedAt}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: node.body }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/${previous.blogId}`} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/${next.blogId}`} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    previous: microcmsBlog(id: { eq: $previousPostId }) {
        blogId
        title
    }
    next: microcmsBlog(id: { eq: $nextPostId }) {
        blogId
        title
    }
    microcmsBlog(id: { eq: $id }) {
        blogId
        title
        body
        description
        publishedAt(formatString: "YYYY/MM/DD")
      }
  
  }
`
