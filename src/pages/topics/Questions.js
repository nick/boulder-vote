import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import TopicTree from './_TopicTree'

const Questions = (props) => {
    // if (props.data.loading) {
    //     return <div>Loading...</div>
    // }

    var topic = props.data.topic || {};

    return (
      <div>
        <Helmet title={`Topic of ${topic.name}`} />
        <nav className="breadcrumb mt-3">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <Link to="/topics" className="breadcrumb-item">Topics</Link>
          {topic &&
            <span className="breadcrumb-item active">{topic.name}</span>
          }
        </nav>
        <div className="row">
          <div className="col-md-8 col-lg-8 col-xl-9 order-md-2 survey-list">
            <h5 className="mb-3">{topic.name}</h5>
            <div style={{ maxWidth: 660 }}>
              <ol className="mb-2">
                {(topic.questions || []).map(q =>
                  <li key={`${q.surveyId}-${q.id}`} className="mb-3">
                    {q.question}
                    <br/>
                    <div style={{ fontSize: 14}}>
                      <Link to={`/topics/${topic.id}/${q.surveyId}/${q.questionId}`}>
                        {`${q.answerCount} responses`}
                      </Link>
                    </div>
                  </li>
                )}
              </ol>
            </div>
          </div>
          <div className="col-md-4 col-lg-3 order-md-1">
            <hr className="d-sm-none" />
            <h5>Topics</h5>
            <TopicTree
              topics={props.data.topics}
              topic={topic}
              location={props.location}
            />
          </div>
        </div>
      </div>
    )
}


const Query = gql`
  query($topic: String!) {
    topics { id, name }
    topic(id: $topic) {
      id, name
      questions {
        id, question, questionId, questionShort, answerCount, surveyId
      }
    }
  }
`;

export default graphql(Query, {
  options: (props) => ({ variables: props.match.params })
})(Questions);
