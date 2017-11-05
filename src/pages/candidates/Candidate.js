import React from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import SideBarLink from '../../components/SideBarLink';

const Candidate = (props) => {
    var candidate = props.data.candidate || {};

    return (
      <div className="row">
        <Helmet title={`${candidate.name || ''}: Boulder City Council Candidate`} />
        <div className="col-sm-8 col-md-9 col-lg-6 order-sm-2">
          <h3 className="mt-3 mb-3">{candidate.name || ''}</h3>
          {!candidate.video ? null :
            <div className="candidate-video">
              <iframe
                src={`https://player.vimeo.com/video/${candidate.video}?autoplay=0&byline=0&portrait=0&title=0`}
                frameBorder="0"
                allowFullScreen="true"
              />
            </div>
          }

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
              {!(candidate.topics || []).length ? null :
                <div className="candidate-links mt-3">
                  <h5>{`${candidate.firstName}'s Positions:`}</h5>
                  {candidate.topics.map((t, idx) =>
                    <Link key={idx} to={`/topics/${t.id}`}>
                      {t.name}
                    </Link>
                  )}
                </div>
              }
            </div>
            <div className="col-md-5 mb-3">
              {!(candidate.surveys || []).length ? null :
                <div className="candidate-links mb-3">
                  <h5>Surveys:</h5>
                  {candidate.surveys.map(s =>
                    <Link key={s.id} to={`/surveys/${s.id}/${s.questionId}/${s.answerId}`}>
                      {s.name}
                    </Link>
                  )}
                </div>
              }

              {!(candidate.endorsements || []).length ? null :
                <div className="candidate-links mb-3">
                  <h5>Endorsements:</h5>
                  {candidate.endorsements.map(g =>
                    <div key={g.id}>
                      <Link to={`/endorsement/${g.id}`}>{g.name}</Link>
                    </div>
                  )}
                </div>
              }

              <div className="candidate-links mb-3">
                <h5>Profiles:</h5>
                <a href={candidate.blueLineProfile} target="_blank">
                  The Blue Line
                </a>
                <a href={`http://www.dailycamera.com/${candidate.dailyCameraProfile}`} target="_blank">
                  Daily Camera
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-2 order-sm-1">
          <h5 className="mt-3">Candidates</h5>
          <ul className="list-unstyled">
            {(props.data.candidates || []).map(c =>
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

const Query = gql`
  query getCandidate($id: String!) {
    candidates { id, name }
    candidate(id: $id) {
      id
      name, firstName, lastName
      website, facebook, twitter
      videoThumbnail, thumbnailSize, offsetX, offsetY,
      video, yearsInBoulder
      dailyCameraProfile, blueLineProfile
      endorsements { id, name }
      topics { id, name }
      surveys { id, name, questionId, answerId }
    }
  }
`;

export default graphql(Query, {
  options: (props) => ({ variables: props.match.params })
})(Candidate);
