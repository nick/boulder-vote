import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet'

import shuffleEachDay from '../../lib/shuffleEachDay'
import styleHtml from '../../lib/styleHtml'
import SurveyData from '../../data/Surveys'
import CandidateData from '../../data/Candidates'

import SideBarLink from '../../components/SideBarLink'
import ProfilePic from '../../components/ProfilePic'
import CandidateNames from '../../components/CandidateNames';

const Survey = (props) => {
    var survey = SurveyData.find(c => c.id === props.match.params.survey),
        questionId = props.match.params.question,
        question,
        candidateId = props.match.params.candidate,
        candidateAnswer,
        candidate,
        candidatesWithAnswerIds,
        candidatesNoAnswer,
        pageURL = encodeURIComponent(`https://bouldervote.com${props.location.pathname}`);

    if (questionId) {
        question = survey.questions.find(q => q.id === questionId);
        candidatesWithAnswerIds = question.answers.filter(a => a.answer).map(a => a.id);
        candidatesNoAnswer = CandidateData.filter(c => candidatesWithAnswerIds.indexOf(c.id) < 0).map(c => c.id);
        if (candidateId) {
            candidate = CandidateData.find(q => q.id === candidateId);
            candidateAnswer = question.answers.find(q => q.id === candidateId);
        }
        else {
            var firstCandidateWithAnswer = shuffleEachDay(CandidateData).filter(c => candidatesWithAnswerIds.indexOf(c.id) >= 0)[0];
            if (firstCandidateWithAnswer) {
                var aid = question.answers.find(a => a.id === firstCandidateWithAnswer.id).id;
                return <Redirect to={`/surveys/${survey.id}/${question.id}/${aid}`} />
            }
            else {
                return <Redirect to={`/surveys/${survey.id}`} />
            }
        }
    }

    return (
      <div>
        <Helmet title={`Survey ${survey.name}`} />
        <nav className="breadcrumb mt-3">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <Link to="/surveys" className="breadcrumb-item">Surveys</Link>
          <Link to={`/surveys/${survey.id}`} className="breadcrumb-item">{survey.shortName}</Link>
          <span className="breadcrumb-item active">{question.questionShort}</span>
        </nav>
        <div className="row">
          <div className="col-md-8 col-lg-8 col-xl-9 order-md-2 survey-list">
            {candidateId ? null : <h5 className="mb-3">{survey.name} Survey</h5>}
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
              {!candidate ? null :
                <div style={{ display: 'flex' }}>
                  <ProfilePic candidate={candidate} />
                  <div style={{ marginLeft: '1.5rem' }}>
                    {(!candidateAnswer || !candidateAnswer.answer)
                      ? <i>{`No response from ${candidate.name}`}</i>
                      : (
                        <div>
                          {styleHtml(candidateAnswer.answer)}
                          {!candidate.twitter ? null :
                            <div className="mt-2">
                              <a
                                href={`https://twitter.com/intent/tweet?url=${pageURL}&text=@${candidate.twitter}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.open(`https://twitter.com/intent/tweet?url=${pageURL}&text=@${candidate.twitter}`, '_blank', 'width=440,height=250,status=no,menubar=no,titlebar=no')
                                }}
                              ><i className="fa fa-twitter mr-1" />{`Tweet @${candidate.twitter} about this issue`}</a>
                            </div>
                          }
                        </div>
                      )
                    }
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="col-md-4 col-lg-3 order-md-1">
            <hr className="d-sm-none" />
            <h5>{`${survey.shortName} Survey`}</h5>
            <ul className="list-unstyled">
              {survey.questions.map(q =>
                <SideBarLink
                  key={q.id}
                  location={props.location}
                  href={`/surveys/${survey.id}/${q.id}${candidateId ? `/${candidateId}` : ''}`}
                  children={q.questionShort}
                />
              )}
            </ul>
          </div>
        </div>
      </div>
    )
}

export default Survey;
