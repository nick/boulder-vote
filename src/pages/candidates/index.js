import React from "react";
import { Switch, Route } from "react-router-dom";

import shuffleEachDay from '../../lib/shuffleEachDay'

import Groups from "../../data/Groups";
import IssueData from "../../data/Issues";

import SideBarLink from "../../components/SideBarLink";

import AllCandidates from "./AllCandidates";
import Issues from "./Issues";
import Endorsements from "./Endorsements";

const CandidatesWrapper = props => {
  return (
    <div className="row">
      <div className="col-sm-8 col-md-9 order-sm-2" style={{ paddingTop: "1.5rem" }}>
        <Switch>
          <Route path="/endorsement/:group" component={Endorsements} />
          <Route path="/issues/:issue" component={Issues} />
          <Route component={AllCandidates} />
        </Switch>
      </div>
      <div className="col-sm-4 col-md-3 order-sm-1">
        <h5 className="mt-3">Endorsements</h5>
        <ul className="list-unstyled">
          {shuffleEachDay(Groups).map(g => (
            <SideBarLink
              key={g.id}
              location={props.location}
              href={`/endorsement/${g.id}`}
              children={g.name}
            />
          ))}
        </ul>
        <h5 className="mt-3">Issues</h5>
        <ul className="list-unstyled">
          {shuffleEachDay(IssueData).map(i => (
            <SideBarLink
              key={i.id}
              location={props.location}
              href={`/issues/${i.id}`}
              children={i.name}
            />
          ))}
        </ul>
        <h5 className="mt-3">Resources</h5>
        <ul className="list-unstyled">
          <li>
            <a
              href="http://www.sos.state.co.us/pubs/elections/vote/VoterHome.html"
              target="_blank" rel="noopener noreferrer"
            >
              Register to Vote
            </a>
          </li>
          <li>
            <a
              href="https://www.sos.state.co.us/voter/pages/pub/olvr/findVoterReg.xhtml"
              target="_blank" rel="noopener noreferrer"
            >
              Check Registration
            </a>
          </li>
          <li>
            <a
              href="https://www.bouldercounty.org/elections/information/voting-locations/"
              target="_blank" rel="noopener noreferrer"
            >
              Voting Locations
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CandidatesWrapper;
