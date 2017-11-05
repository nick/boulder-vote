import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import CandidateProfiles from '../../components/CandidateProfiles';

class AllCandidates extends Component {
    render() {
        return (
          <div>
            <Helmet title="Boulder City Council Candidates" />
            <h5 style={{ marginBottom: '1.5rem' }}>
              Boulder City Council Candidates
            </h5>
            {this.props.data.loading
              ? <span>Loading</span>
              : <CandidateProfiles
                  candidates={this.props.data.candidates}
                />
            }
          </div>
        )
    }
}

const Query = gql`
  query {
    candidates {
      id
      name, firstName, lastName
      website, facebook, twitter
      videoThumbnail, thumbnailSize, offsetX, offsetY
    }
  }
`;

export default graphql(Query)(AllCandidates);
