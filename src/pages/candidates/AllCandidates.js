import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import Candidates from '../../data/Candidates';

import CandidateProfiles from '../../components/CandidateProfiles';

export default class AllCandidates extends Component {
    render() {
        return (
          <div>
            <Helmet title="Boulder City Council Candidates" />
            <h5 style={{ marginBottom: '1.5rem' }}>
              Boulder City Council Candidates
            </h5>
            <CandidateProfiles candidates={Candidates} />
          </div>
        )
    }
}
