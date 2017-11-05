import React, { Component } from 'react'
import { Switch, Route } from 'react-router';
import { Helmet } from 'react-helmet'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styleHtml from '../../lib/styleHtml'

import SideBarLink from '../../components/SideBarLink';
import Tabs, { Tab } from '../../components/Tabs';

class BallotIssue extends Component {
    constructor(props) {
        super(props)
        this.state = { positions: {} };
        try {
          this.state.positions = JSON.parse(window.localStorage.positions) || {};
        } catch(e) { /* Ignore */ }
    }
    render() {
        var props = this.props;
        if (props.data.loading) {
            return <div>Loading...</div>
        }

        var issue = props.data.ballotIssue;

        return (
          <div className="row">
            <Helmet title={`Issue ${issue.name}`} />
            <div className="col-md-8 col-lg-9 order-md-2">
              <h3 className="mt-3 mb-3">{issue.name}</h3>
              <h5>
                {issue.description}
              </h5>
              <Tabs style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                <Tab exact href={`/ballot-issues/${issue.id}`}>Ballot Text</Tab>
                {issue.summary && <Tab href={`/ballot-issues/${issue.id}/summary`}>Summary</Tab>}
                {issue.commentsFor && <Tab href={`/ballot-issues/${issue.id}/reasons-for`}>Reasons FOR</Tab>}
                {issue.commentsAgainst && <Tab href={`/ballot-issues/${issue.id}/reasons-against`}>Reasons AGAINST</Tab>}
              </Tabs>
              <div style={{ maxWidth: 660 }}>
                <Switch>
                  <Route path={`/ballot-issues/${issue.id}/summary`}>
                    <div>
                      {styleHtml(issue.summary)}
                    </div>
                  </Route>
                  <Route path={`/ballot-issues/${issue.id}/reasons-for`}>
                    <div>
                      {styleHtml(issue.commentsFor)}
                    </div>
                  </Route>
                  <Route path={`/ballot-issues/${issue.id}/reasons-against`}>
                    <div>
                      {styleHtml(issue.commentsAgainst)}
                    </div>
                  </Route>
                  <Route>
                    <div dangerouslySetInnerHTML={{ __html: issue.text }} />
                  </Route>
                </Switch>
                <div className="my-3" style={{ borderTop: '1px solid #eee', paddingTop: '1.25rem' }}>
                  <button className={`btn btn${this.state.positions[issue.id] === 'for' ? '' : '-outline'}-primary btn-sm mr-2`}
                    onClick={() => this.setPosition(issue.id, 'for')}
                  >
                    <i className="fa fa-thumbs-o-up" /> YES / FOR THE MEASURE
                  </button>
                  <button className={`btn btn${this.state.positions[issue.id] === 'against' ? '' : '-outline'}-danger btn-sm`}
                    onClick={() => this.setPosition(issue.id, 'against')}
                  >
                    <i className="fa fa-thumbs-o-down" /> NO / AGAINST THE MEASURE
                  </button>
                  {this.state.positions[issue.id] &&
                    <div style={{ lineHeight: '14px', marginTop: '0.5rem', maxWidth: 500 }}>
                      <small><b>Please note:</b> Your selection is NOT sent over the network, it is only stored locally on your device. Clear your browsing data to remove any trace.</small><br/>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="col-md-4 col-lg-3 order-md-1">
              <h5 className="mt-3">Ballot Issues</h5>
              <ul className="list-unstyled">
                {props.data.ballotIssues.map(i =>
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

    setPosition(issueId, position) {
        var newState = this.state;
        if (this.state.positions[issueId] === position) {
            delete newState.positions[issueId];
        }
        else {
            newState = {
                positions: Object.assign({}, this.state.positions, {
                    [issueId]: position
                })
            };
        }
        this.setState(newState)
        try {
            window.localStorage.positions = JSON.stringify(newState.positions);
        } catch(e) { /* Ignore */ }
    }
}

const Query = gql`
  query getCandidate($id: String!) {
    ballotIssues { id, name }
    ballotIssue(id: $id) {
      id
      name
      shortName
      description
      shortDescription
      caps
      text
      answers { id, text }
      summary
      commentsAgainst
      commentsFor
    }
  }
`;

export default graphql(Query, {
  options: (props) => ({ variables: props.match.params })
})(BallotIssue);
