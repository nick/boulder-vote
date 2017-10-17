import React from 'react'
import { Redirect } from 'react-router';
import { Helmet } from 'react-helmet'

import Candidates from '../../data/Candidates';
import Groups from '../../data/Groups';

import CandidateProfiles from '../../components/CandidateProfiles';

const Endorsements = (props) => {
    var endorsementId = props.match.params.group,
        endorser = Groups.find(g => g.id === endorsementId);

    if (!endorser) { return <Redirect to="/" /> }

    var candidates = Candidates.filter(c =>
        c.endorsements.indexOf(endorsementId) >= 0
    )
    var title = `${endorser.name} endorsements for Boulder City Council`;

    return (
      <div>
        <Helmet title={title} />
        <div className="mb-3">
          <h5>{endorser.name} endorsements</h5>
          {!endorser.endorsements ? null :
            <div style={{ wordBreak: 'break-word' }}>
              Source: <a href={endorser.endorsements} target="_blank">{endorser.endorsements}</a>
            </div>
          }
        </div>
        <CandidateProfiles candidates={candidates}/>
      </div>
    )
}

export default Endorsements;
