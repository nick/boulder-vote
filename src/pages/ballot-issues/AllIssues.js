import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class AllIssues extends Component {
    render() {
        if (this.props.data.loading) {
          return <div>Loading...</div>
        }
        return (
          <div className="row">
            <Helmet title="Boulder City Council Candidates" />
            <div className="col-md-2 col-lg-3" />
            <div className="col-md-10 col-lg-9 col-xl-6 pb-3">
              <h3 className="mt-3 mb-3">Boulder City Ballot Issues</h3>
              {this.props.data.ballotIssues.map(i =>
                <div key={i.id} className="mb-2">
                  <Link to={`/ballot-issues/${i.id}`}>
                    {`${i.shortName}: ${i.shortDescription || i.description}`}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )
    }
}

const Query = gql`
  query {
    ballotIssues { id, shortName, shortDescription, description }
  }
`;

export default graphql(Query)(AllIssues);
