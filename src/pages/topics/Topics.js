import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// import SurveyData from '../../data/Surveys'
import TopicData from '../../data/Topics'

export default class AllSurveys extends Component {
    render() {

        return (
          <div>
            <Helmet title="Boulder Political Topics" />
            <nav className="breadcrumb mt-3">
              <Link to="/" className="breadcrumb-item">Home</Link>
              <span className="breadcrumb-item active">Topics</span>
            </nav>
            <div className="row">
              <div className="col-md-2 col-lg-3" />
              <div className="col-md-5 col-xl-4 pb-3">
                <h5 className="mb-3">Topics</h5>
                {TopicData.map(t =>
                  <div key={t.id} className="mb-2">
                    <Link to={`/topics/${t.id}`}>
                      {t.name}
                    </Link>
                    <span style={{ fontSize: 14 }} className="ml-3">
                      {`${t.numQuestions} questions`}
                    </span>
                  </div>
                )}
              </div>

            </div>
          </div>
        )
    }
}
