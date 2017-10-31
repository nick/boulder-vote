import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import SurveyData from '../../data/Surveys'
import TopicData from '../../data/Topics'

export default class AllSurveys extends Component {
    render() {

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
                {SurveyData.map(s =>
                  <div key={s.id} className="mb-3">
                    <Link to={`/surveys/${s.id}`}>
                      {s.name}
                    </Link>
                    <div style={{ fontSize: 14 }}>
                      {`${s.numQuestions} questions, ${s.responses} candidate responses`}
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-lg-3 order-md-1">
                <hr className="d-sm-none" />
                <h5 className="mb-3">Topics</h5>
                {TopicData.map(t =>
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
