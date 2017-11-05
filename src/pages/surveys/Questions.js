import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import SideBarLink from '../../components/SideBarLink'
import QuestionLinks from './_QuestionLinks';

const Questions = (props) => {

    if (props.data.loading) {
      return <div>Loading...</div>
    }

    var survey = props.data.survey;

    return (
      <div>
        <Helmet title={`${survey.name} Survey`} />
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
                {survey.questions.map(q =>
                  <li key={q.id} className="mb-3">
                    {q.question}<br/>
                    <div style={{ fontSize: 14}}>
                      <Link to={`/surveys/${survey.id}/${q.id}`}>
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
            <h5>Surveys</h5>
            <ul className="list-unstyled">
              {props.data.surveys.map(s =>
                <SideBarLink
                  key={s.id}
                  location={props.location}
                  href={`/surveys/${s.id}`}
                  children={s.shortName}
                />
              )}
            </ul>
            <h5 className="mt-3">Questions</h5>
            <QuestionLinks
              survey={survey}
              location={props.location}
            />
          </div>
        </div>
      </div>
    )
}

const Query = gql`
  query($survey: String!) {
    surveys { id, shortName }
    survey(id: $survey) {
      id, name, shortName
      questions {
        id, question, questionShort, answerCount
      }
    }
  }
`;

export default graphql(Query, {
  options: (props) => ({ variables: props.match.params })
})(Questions);
