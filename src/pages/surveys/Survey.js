import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import shuffleEachDay from '../../lib/shuffleEachDay'
import SurveyData from '../../data/Surveys'
import CandidateData from '../../data/Candidates'

import CandidateNames from '../../components/CandidateNames'

import Answer from './_Answer';
import QuestionLinks from './_QuestionLinks';

const Survey = (props) => {
    var survey = SurveyData.find(c => c.id === props.match.params.survey),
        questionId = props.match.params.question,
        question = survey.questions.find(q => q.id === questionId),
        candidateId = props.match.params.candidate,
        candidatesWithAnswersIds = question.answers.filter(a => a.answer).map(a => a.id),
        candidatesNoAnswer = CandidateData.filter(c => candidatesWithAnswersIds.indexOf(c.id) < 0).map(c => c.id);

    if (!candidateId) {
        var firstCandidateWithAnswer = shuffleEachDay(CandidateData).find(c =>
            candidatesWithAnswersIds.indexOf(c.id) >= 0
        )
        if (firstCandidateWithAnswer) {
            var aid = question.answers.find(a => a.id === firstCandidateWithAnswer.id).id;
            return <Redirect to={`/surveys/${survey.id}/${question.id}/${aid}`} />
        }
        else {
            return <Redirect to={`/surveys/${survey.id}`} />
        }
    }

    return (
      <div>
        <Helmet title={`Survey ${survey.name}`} />
        <nav className="breadcrumb mt-3">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <Link to="/surveys" className="breadcrumb-item">Surveys</Link>
          <Link to={`/surveys/${survey.id}`} className="breadcrumb-item">
            {survey.shortName}
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
                onSelect={(c) => props.history.push(
                  `/surveys/${survey.id}/${question.id}/${c}`
                )}
              />
              <div style={{ borderTop: '1px solid #eee' }} className="mb-3 mt-2 pt-3">
                <b>{`${question.number}. ${question.question}`}</b>
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
            <h5>{`${survey.shortName} Survey`}</h5>
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

export default Survey;
