import React from 'react'
import { Helmet } from 'react-helmet';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import SmallCandidateProfiles from '../../components/SmallCandidateProfiles';

const Issues = ({ data: { loading, issue }}) => {

    if (loading) {
        return <div>Loading...</div>
    }

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

        {(issue.answers || []).map(answer =>
          <div key={answer.id}>
            <div className="mb-2"><b>{answer.description}:</b></div>
            <SmallCandidateProfiles candidates={answer.candidates}/>
          </div>
        )}
      </div>
    )
}

const Query = gql`
  query($issue: String!) {
    issue(id: $issue) {
      id, name, question, source,
      answers {
        id, description,
        candidates {
          id, name, videoThumbnail, thumbnailSize, offsetX, offsetY
        }
      }
    }
  }
`;

export default graphql(Query, {
  options: (props) => ({ variables: props.match.params })
})(Issues);
