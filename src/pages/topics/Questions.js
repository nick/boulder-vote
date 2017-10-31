import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import SideBarLink from '../../components/SideBarLink'
import TopicData from '../../data/Topics'

const Questions = (props) => {
    var topic = TopicData.find(c => c.id === props.match.params.topic);

    return (
      <div>
        <Helmet title={`Topic of ${topic.name}`} />
        <nav className="breadcrumb mt-3">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <Link to="/topics" className="breadcrumb-item">Topics</Link>
          <span className="breadcrumb-item active">{topic.name}</span>
        </nav>
        <div className="row">
          <div className="col-md-8 col-lg-8 col-xl-9 order-md-2 survey-list">
            <h5 className="mb-3">{topic.name}</h5>
            <div style={{ maxWidth: 660 }}>
              <ol className="mb-2">
                {topic.questions.filter(q => q.question).map(q =>
                  <li key={`${q.survey.id}-${q.id}`} className="mb-3">
                    {q.question}
                    <br/>
                    <div style={{ fontSize: 14}}>
                      <Link to={`/topics/${topic.id}/${q.survey.id}/${q.id}`} onClick={() => window.scrollTo(0, 0)}>
                        {`${q.answers.filter(a => a.answer).length} responses`}
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
            <ul className="list-unstyled">
              {TopicData.map(t =>
                <SideBarLink
                  key={t.id}
                  location={props.location}
                  href={`/topics/${t.id}`}
                  children={t.name}
                />
              )}
            </ul>
          </div>
        </div>
      </div>
    )
}

export default Questions;
