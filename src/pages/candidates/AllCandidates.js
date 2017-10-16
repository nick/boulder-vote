import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import Candidates from '../../data/Candidates';

import CandidateProfiles from '../../components/CandidateProfiles';

export default class AllCandidates extends Component {
    render() {
        return (
          <div>
            <Helmet title="Boulder City Council Candidates" />
            <CandidateProfiles candidates={Candidates} />
          </div>
        )
    }
}
