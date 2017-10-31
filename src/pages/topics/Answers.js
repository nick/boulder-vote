import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import shuffleEachDay from '../../lib/shuffleEachDay'
import questionInfo from '../../lib/questionInfo'

import SurveyData from '../../data/Surveys'
import CandidateData from '../../data/Candidates'
import TopicData from '../../data/Topics'

import CandidateNames from '../../components/CandidateNames'
import Answer from '../../components/CandidateAnswer'
import TopicTree from './_TopicTree'

const TopicAnswers = (props) => {
    var topicId = props.match.params.topic,
        topic = topicId ? TopicData.find(t => t.id === topicId) : null,
        surveyId = props.match.params.survey,
        survey = SurveyData.find(c => c.id === surveyId),
        questionId = props.match.params.question,
        question = survey.questions.find(q => q.id === questionId),
        candidateId = props.match.params.candidate,
        questionUrl = `/topics/${topicId}/${surveyId}/${questionId}`;

    var { firstAnswer, candidatesNoAnswer } = questionInfo(question);

    if (!candidateId) {
        var uri = `/topics/${topicId}`;
        if (firstAnswer) {
            uri += `/${surveyId}/${questionId}/${firstAnswer.id}`;
        }
        return <Redirect to={uri} />
    }

    return (
      <div>
        <Helmet title={`Survey ${survey.name}`} />
        <nav className="breadcrumb mt-3">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <Link to="/topics" className="breadcrumb-item">Topics</Link>
          <Link to={`/topics/${topicId}`} className="breadcrumb-item">
            {topic.name}
          </Link>
          <span className="breadcrumb-item active">
            {question.questionShort}
          </span>
        </nav>
        <div className="row">
          <div className="col-md-8 col-lg-8 col-xl-9 order-md-2 survey-list">
            <div style={{ maxWidth: 660 }}>
              <CandidateNames
                candidates={shuffleEachDay(CandidateData)}
                selected={candidateId}
                disabled={candidatesNoAnswer}
                onSelect={(c) => props.history.push(`${questionUrl}/${c}`)}
              />
              <div style={{ borderTop: '1px solid #eee' }} className="mb-3 mt-2 pt-3">
                <b>{`${question.question}`}</b>
              </div>
              <Answer
                question={question}
                candidateId={candidateId}
                path={props.location.pathname}
              />
            </div>
          </div>
          <div className="col-md-4 col-lg-3 order-md-1">
            <hr className="d-sm-none" />
            <h5>Topics</h5>
            <TopicTree
              candidateId={candidateId}
              topicId={topicId}
              location={props.location}
            />
          </div>
        </div>
      </div>
    )
}

export default TopicAnswers;
