import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import CandidateNames from '../../components/CandidateNames'
import Answer from '../../components/CandidateAnswer'
import TopicTree from './_TopicTree'

const TopicAnswers = (props) => {

    var topicId = props.match.params.topic,
        surveyId = props.match.params.survey,
        questionId = props.match.params.question,
        candidateId = props.match.params.candidate;

    var { loading, topics, topic, survey, candidates, candidate } = props.data;

    if (!candidateId) {
        if (loading) { return <div>Loading...</div>; }
        var uri = `/topics/${topicId}`;
        var firstAnswer = candidates.find(c =>
            survey.question.answerIds.find(a => a === c.id)
        )
        if (firstAnswer) {
            uri += `/${surveyId}/${questionId}/${firstAnswer.id}`;
        }
        return <Redirect to={uri} />
    }

    return (
      <div>
        <Helmet title={`Survey ${survey ? survey.name : ''}`} />
        <nav className="breadcrumb mt-3">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <Link to="/topics" className="breadcrumb-item">Topics</Link>
          {topic &&
            <Link to={`/topics/${topicId}`} className="breadcrumb-item">
              {topic.name}
            </Link>
          }
          {survey &&
            <span className="breadcrumb-item active">
              {survey.question.questionShort}
            </span>
          }
        </nav>
        <div className="row">
          <div className="col-md-8 col-lg-8 col-xl-9 order-md-2 survey-list">
            {survey &&
              <div style={{ maxWidth: 660 }}>
                <CandidateNames
                  candidates={candidates}
                  selected={candidateId}
                  enabled={survey.question.answerIds}
                  urlPrefix={`/topics/${topicId}/${surveyId}/${questionId}`}
                />
                <div style={{ borderTop: '1px solid #eee' }} className="mb-3 mt-2 pt-3">
                  <b>{`${survey.question.question}`}</b>
                </div>
                <Answer
                  candidate={candidate}
                  question={survey.question}
                  path={props.location.pathname}
                />
              </div>
            }
          </div>
          <div className="col-md-4 col-lg-3 order-md-1">
            <hr className="d-sm-none" />
            <h5>Topics</h5>
            <TopicTree
              topics={topics}
              topic={topic}
              candidateId={candidateId}
              location={props.location}
            />
          </div>
        </div>
      </div>
    )
}

const Query = gql`
  query($topic: String!, $survey: String!, $question: String!, $candidate: String!, $hasCandidate: Boolean!) {
    topic(id: $topic) {
      id, name
      questions {
        id, questionId, questionShort, surveyId
      }
    }
    topics {
      id, name
    }
    survey(id: $survey) {
      id, name, shortName, responseIds
      questions { id, questionShort }
      question(id: $question) {
        id, question, questionShort, number, answerIds
        answers { id }
        answer(id: $candidate) @include(if: $hasCandidate) {
          id, answer
        }
      }
    }
    candidates {
      id, name
    }
    candidate(id: $candidate) @include(if: $hasCandidate) {
      id, name, videoThumbnail, thumbnailSize, offsetX, offsetY
    }
  }
`;

export default graphql(Query, {
  options: (props) => ({ variables: Object.assign({}, props.match.params, {
    hasCandidate: props.match.params.candidate ? true : false,
    candidate: props.match.params.candidate || 'null'
  })})
})(TopicAnswers);
