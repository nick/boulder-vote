import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import CandidateNames from '../../components/CandidateNames'
import Answer from '../../components/CandidateAnswer';

import QuestionLinks from './_QuestionLinks';

const Survey = (props) => {

    var surveyId = props.match.params.survey,
        questionId = props.match.params.question,
        candidateId = props.match.params.candidate,
        survey = props.data.survey;

    if (!candidateId) {
        if (props.data.loading) { return <div>Loading...</div>; }
        var uri = `/surveys/${surveyId}`;
        var firstAnswer = props.data.candidates.find(c =>
            survey.question.answerIds.find(a => a === c.id)
        )
        if (firstAnswer) {
            uri += `/${questionId}/${firstAnswer.id}`;
        }
        return <Redirect to={uri} />
    }

    return (
      <div>
        {survey &&
          <Helmet title={`${survey.shortName} Survey Question ${survey.question.number}`} />
        }
        <nav className="breadcrumb mt-3">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <Link to="/surveys" className="breadcrumb-item">Surveys</Link>
          {survey &&
            <Link to={`/surveys/${survey.id}`} className="breadcrumb-item">
              {survey.shortName}
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
            <div style={{ maxWidth: 660 }}>
              <CandidateNames
                candidates={props.data.candidates}
                selected={candidateId}
                enabled={survey ? survey.question.answerIds : null}
                urlPrefix={`/surveys/${surveyId}/${questionId}`}
              />
              {survey &&
                <div style={{ borderTop: '1px solid #eee' }} className="mb-3 mt-2 pt-3">
                  <b>{`${survey.question.number}. ${survey.question.question}`}</b>
                </div>
              }
              {survey &&
                <Answer
                  candidate={props.data.candidate}
                  question={survey.question}
                  path={props.location.pathname}
                />
              }
            </div>
          </div>
          <div className="col-md-4 col-lg-3 order-md-1">
            <hr className="d-sm-none" />
            {survey && <h5>{`${survey.shortName} Survey`}</h5>}
            <QuestionLinks
              survey={survey}
              candidateId={candidateId}
              location={props.location}
            />
          </div>
        </div>
      </div>
    )
}

const Query = gql`
  query($survey: String!, $question: String!, $candidate: String!, $hasCandidate: Boolean!) {
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
})(Survey);
