import React from 'react'
import { Redirect } from 'react-router';
import { Helmet } from 'react-helmet';

import shuffleEachDay from '../../lib/shuffleEachDay';
import Candidates from '../../data/Candidates';
import IssueData from '../../data/Issues';

import SmallCandidateProfiles from '../../components/SmallCandidateProfiles';

function findCandidates(issue, answer) {
    return Candidates.filter(c => {
        var candidateIssue = (c.issues || []).find(i => i.id === issue.id);
        return (candidateIssue && candidateIssue.answer === answer.id) ? true : false;
    })
}

const Issues = (props) => {
    var issueId = props.match.params.issue,
        issue = IssueData.find(i => i.id === issueId);

    if (!issue) { return <Redirect to="/" /> }

    return (
      <div>
        <Helmet title={`${issue.name} in Boulder`} />
        <h5>The issue of {issue.name}</h5>
        <div style={{ marginBottom: '1.5rem' }}>
          {issue.question}
          <a href={issue.source} target="_blank" className="ml-2">
            Source of data
          </a>
        </div>

        {shuffleEachDay(issue.answers).map(answer => {
          var issueCandidates = findCandidates(issue, answer);
          if (!issueCandidates.length) { return null }
          return (
            <div key={answer.id}>
              <div className="mb-2"><b>{answer.description}:</b></div>
              <SmallCandidateProfiles candidates={issueCandidates}/>
            </div>
          )
        })}
      </div>
    )
}

export default Issues
