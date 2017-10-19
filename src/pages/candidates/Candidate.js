import React from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'

import shuffleEachDay from '../../lib/shuffleEachDay'
import Candidates from '../../data/Candidates';
import SurveyData from '../../data/Surveys';
import Groups from '../../data/Groups';

import SideBarLink from '../../components/SideBarLink';

function candidateAnswers(candidateId) {
    var answers = [];
    SurveyData.forEach(s => {
        s.questions.forEach(q => {
            answers = [
                ...answers,
                ...q.answers.filter(a => a.id === candidateId).map(a =>
                    Object.assign({}, a, {
                        survey: s,
                        question: q
                    })
                )
            ]
        })
    })
    return answers;
}

const Candidate = (props) => {
    var candidate = Candidates.find(c => c.id === props.match.params.id);
    var endorsements = candidate.endorsements
        .map((e) => Groups.find((g) => g.id === e))
        .filter(g => g);
    var answers = candidateAnswers(candidate.id);

    return (
      <div className="row">
        <Helmet title={`${candidate.name}: Boulder City Council Candidate`} />
        <div className="col-sm-8 col-md-9 col-lg-6 order-sm-2">
          <h3 className="mt-3 mb-3">{candidate.name}</h3>
          <div>
            <iframe
              src={`https://player.vimeo.com/video/${candidate.video}?autoplay=0&byline=0&portrait=0&title=0`}
              width="100%"
              height="320"
              frameBorder="0"
              allowFullScreen="true"
            />
          </div>

          <div className="mt-3 row">
            <div className="col-md-7 mb-3">
              <div>
                <a href={candidate.website} target="_blank">{candidate.website}</a>
                {!candidate.facebook ? null :
                  <a
                    className="social-icon fb ml-3"
                    href={`https://facebook.com/${candidate.facebook}`}
                    target="_blank"
                  ><i className="fa fa-facebook" /></a>
                }
                {!candidate.twitter ? null :
                  <a
                    className="social-icon tw ml-1"
                    href={`https://twitter.com/${candidate.twitter}`}
                    target="_blank"
                  ><i className="fa fa-twitter" /></a>
                }
              </div>
              <div>{`${candidate.yearsInBoulder} years in Boulder`}</div>
              {!answers.length ? null :
                <div className="candidate-links mt-3">
                  <h5>{`${candidate.firstName}'s Survey Answers:`}</h5>
                  {answers.map((a, idx) =>
                    <Link key={idx} to={`/surveys/${a.survey.id}/${a.question.id}/${candidate.id}`}>
                      {a.question.questionShort}
                    </Link>
                  )}
                </div>
              }
            </div>
            <div className="col-md-5 mb-3">
              {!endorsements.length ? null :
                <div className="candidate-links mb-3">
                  <h5>Endorsed by:</h5>
                  {shuffleEachDay(endorsements).map(g =>
                    <div key={g.id}>
                      <Link to={`/endorsement/${g.id}`}>{g.name}</Link>
                    </div>
                  )}
                </div>
              }

              {!candidate.boulderChamberQA && !(candidate.surveys || []).length ? null :
                <div className="candidate-links mb-3">
                  <h5>Surveys:</h5>
                  {!candidate.boulderChamberQA ? null :
                    <a href={candidate.boulderChamberQA} target="_blank">
                      Boulder Chamber Q&A
                    </a>
                  }
                  {shuffleEachDay(candidate.surveys || []).map(s =>
                    <a key={s.id} href={s.url} target="_blank">
                      {s.name}
                    </a>
                  )}
                </div>
              }

              <div className="candidate-links mb-3">
                <h5>Profiles:</h5>
                {shuffleEachDay([
                  <a key="blue" href={candidate.blueLineProfile} target="_blank">
                    The Blue Line
                  </a>,
                  <a key="camera" href={`http://www.dailycamera.com/${candidate.dailyCameraProfile}`} target="_blank">
                    Daily Camera
                  </a>
                ])}
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 order-sm-1">
          <h5 className="mt-3">Candidates</h5>
          <ul className="list-unstyled">
            {shuffleEachDay(Candidates).map(c =>
              <SideBarLink
                key={c.id}
                location={props.location}
                href={`/candidate/${c.id}`}
                children={c.name}
              />
            )}
          </ul>
        </div>
      </div>
    )
}

export default Candidate;
