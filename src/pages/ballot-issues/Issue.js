import React from 'react'
// import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'

import BallotIssueData from '../../data/BallotIssues';

import SideBarLink from '../../components/SideBarLink';

const BallotIssue = (props) => {
    var issue = BallotIssueData.find(c => c.id === props.match.params.id);

    return (
      <div className="row">
        <Helmet title={`Issue ${issue.name}`} />
        <div className="col-md-8 col-lg-9 order-md-2">
          <h3 className="mt-3 mb-3">{issue.name}</h3>
          <h5>
            {issue.description}
          </h5>
          <div dangerouslySetInnerHTML={{ __html: issue.text }} />

        </div>
        <div className="col-md-4 col-lg-3 order-md-1">
          <h5 className="mt-3">Ballot Issues</h5>
          <ul className="list-unstyled">
            {BallotIssueData.map(i =>
              <SideBarLink
                key={i.id}
                location={props.location}
                href={`/ballot-issues/${i.id}`}
                children={i.name}
              />
            )}
          </ul>
        </div>
      </div>
    )
}

export default BallotIssue;
