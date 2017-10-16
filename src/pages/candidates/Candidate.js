import React from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'

import Candidates from '../../data/Candidates';
import Groups from '../../data/Groups';

import SideBarLink from '../../components/SideBarLink';

const Candidate = (props) => {
    var candidate = Candidates.find(c => c.id === props.match.params.id);
    var endorsements = candidate.endorsements
        .map((e) => Groups.find((g) => g.id === e))
        .filter(g => g);

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
            <div className="col-md-8 mb-3">
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
              <div className="candidate-links mt-3">
                <a href={candidate.blueLineProfile} target="_blank">
                  The Blue Line Profile
                </a>
                <a href={`http://www.dailycamera.com/${candidate.dailyCameraProfile}`} target="_blank">
                  Daily Camera Profile
                </a>
                {!candidate.boulderChamberQA ? null :
                  <a href={candidate.boulderChamberQA} target="_blank">
                    Boulder Chamber Q&A
                  </a>
                }
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Endorsed by:</h5>
              {endorsements.map(g =>
                <div key={g.id}>
                  <Link to={`/endorsement/${g.id}`}>{g.name}</Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 order-sm-1">
          <h5 className="mt-3">Candidates</h5>
          <ul className="list-unstyled">
            {Candidates.map(c =>
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
