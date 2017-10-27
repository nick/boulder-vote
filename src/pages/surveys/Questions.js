import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import SideBarLink from '../../components/SideBarLink'
import SurveyData from '../../data/Surveys'
import QuestionLinks from './_QuestionLinks';

const Questions = (props) => {
    var survey = SurveyData.find(c => c.id === props.match.params.survey);

    return (
      <div>
        <Helmet title={`Survey ${survey.name}`} />
        <nav className="breadcrumb mt-3">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <Link to="/surveys" className="breadcrumb-item">Surveys</Link>
          <span className="breadcrumb-item active">{survey.shortName}</span>
        </nav>
        <div className="row">
          <div className="col-md-8 col-lg-8 col-xl-9 order-md-2 survey-list">
            <h5 className="mb-3">{survey.name} Survey</h5>
            <div style={{ maxWidth: 660 }}>
              <ol className="mb-2">
                {survey.questions.filter(q => q.question).map(q =>
                  <li key={q.id} className="mb-3">
                    <Link to={`/surveys/${survey.id}/${q.id}`} onClick={() => window.scrollTo(0, 0)}>
                      {q.question}
                    </Link><br/>
                    <div style={{ fontSize: 14}}>
                      {`${q.answers.filter(a => a.answer).length} responses`}
                    </div>
                  </li>
                )}
              </ol>
            </div>
          </div>
          <div className="col-md-4 col-lg-3 order-md-1">
            <hr className="d-sm-none" />
            <h5>Surveys</h5>
            <ul className="list-unstyled">
              {SurveyData.map(s =>
                <SideBarLink
                  key={s.id}
                  location={props.location}
                  href={`/surveys/${s.id}`}
                  children={s.shortName}
                />
              )}
            </ul>
            <h5 className="mt-3">Topics</h5>
            <QuestionLinks
              survey={survey}
              location={props.location}
            />
          </div>
        </div>
      </div>
    )
}

export default Questions;
