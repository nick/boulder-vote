import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Topics = (props) => {
    return (
      <div>
        <Helmet title="Boulder Political Topics" />
        <nav className="breadcrumb mt-3">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item active">Topics</span>
        </nav>
        <div className="row">
          <div className="col-md-2 col-lg-3" />
          <div className="col-md-5 col-xl-4 pb-3">
            <h5 className="mb-3">Topics</h5>
            {props.data.loading ? "Loading..." : props.data.topics.map(t =>
              <div key={t.id} className="mb-2">
                <Link to={`/topics/${t.id}`}>
                  {t.name}
                </Link>
                <span style={{ fontSize: 14 }} className="ml-3">
                  {`${t.questionCount} questions`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
}

const Query = gql`
  query {
    topics { id, name, questionCount }
  }
`;

export default graphql(Query)(Topics);
