import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import SmallCandidateProfiles from '../../components/SmallCandidateProfiles'

const Endorsements = (props) => {

    if (props.data.loading) {
        return <div>Loading...</div>
    }

    var endorser = props.data.group;

    return (
      <div>
        <Helmet title={`${endorser.name} endorsements for Boulder City Council`} />
        <div className="mb-3">
          <h5>{endorser.name} endorsements</h5>
          {!endorser.endorsements ? null :
            <div style={{ wordBreak: 'break-word' }}>
              Source: <a href={endorser.endorsements} target="_blank">{endorser.endorsements}</a>
            </div>
          }
        </div>
        <SmallCandidateProfiles
          candidates={props.data.endorsement}
        />
      </div>
    )
}

const Query = gql`
  query($group: String!) {
    group(id: $group) { id, name, endorsements }
    endorsement(id: $group) {
      id, name, videoThumbnail, thumbnailSize, offsetX, offsetY
    }
  }
`;

export default graphql(Query, {
  options: (props) => ({ variables: props.match.params })
})(Endorsements);
