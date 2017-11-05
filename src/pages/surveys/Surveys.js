import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class AllSurveys extends Component {
    render() {

        if (this.props.data.loading) {
          return <div>Loading...</div>
        }

        var surveys = this.props.data.surveys;

        return (
          <div>
            <Helmet title="Boulder City Council Candidate Surveys" />
            <nav className="breadcrumb mt-3">
              <Link to="/" className="breadcrumb-item">Home</Link>
              <span className="breadcrumb-item active">Surveys</span>
            </nav>
            <div className="row">
              <div className="col-md-8 col-lg-8 col-xl-9 order-md-2">
                <h5 className="mb-3">Boulder City Council Candidate Surveys</h5>
                {surveys.map(s =>
                  <div key={s.id} className="mb-3">
                    <Link to={`/surveys/${s.id}`}>
                      {s.name}
                    </Link>
                    <div style={{ fontSize: 14 }}>
                      {`${s.questionCount} questions, ${s.responseCount} candidate responses`}
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-lg-3 order-md-1">
                <hr className="d-sm-none" />
                <h5 className="mb-3">Topics</h5>
                {this.props.data.topics.map(t =>
                  <div key={t.id}>
                    <Link to={`/topics/${t.id}`}>
                      {t.name}
                    </Link>
                  </div>
                )}
              </div>

            </div>
          </div>
        )
    }
}

const Query = gql`
  query {
    surveys { id, name, questionCount, responseCount }
    topics { id, name }
  }
`;

export default graphql(Query)(AllSurveys);
