import React, { Component } from 'react'
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import daysToGo from '../lib/daysToGo';

import Surveys from './surveys/Surveys';
import Survey from './surveys/Survey';
import SurveyQuestions from './surveys/Questions';


import BallotIssues from './ballot-issues/AllIssues';
import BallotIssue from './ballot-issues/Issue';
import Candidates from './candidates';
import Candidate from './candidates/Candidate';
import About from './about';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // componentDidUpdate(prevProps) {
    //   if (this.props.location !== prevProps.location) {
    //     window.scrollTo(0, 0)
    //   }
    // }

    render() {
        return (
          <div>
            <Helmet title="Boulder Vote" />
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <div className="container">
                <Link
                  to="/"
                  className="navbar-brand mr-3"
                  onClick={() => this.setState({ toggled: false })}
                >Boulder Vote</Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={() => this.setState({
                    toggled: this.state.toggled ? false : true
                  })}
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div className={`navbar-collapse collapse${this.state.toggled ? ' show' : ''}`}>
                  <span className="navbar-text d-none d-md-block">
                    {`${daysToGo()} days until election!`}
                  </span>
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        exact
                        to="/"
                        onClick={() => this.setState({ toggled: false })}
                      >Candidates</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/surveys"
                        onClick={() => this.setState({ toggled: false })}
                      >Surveys</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/ballot-issues"
                        onClick={() => this.setState({ toggled: false })}
                      >Issues</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/about"
                        onClick={() => this.setState({ toggled: false })}
                      >About</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div className="container">
              <Switch>
                <Route path="/about" component={About} />
                <Route path="/candidate/:id" component={Candidate} />
                <Route path="/ballot-issues/:id" component={BallotIssue} />
                <Route path="/ballot-issues" component={BallotIssues} />
                <Route path="/surveys/:survey/:question/:candidate" component={Survey} />
                <Route path="/surveys/:survey/:question" component={Survey} />
                <Route path="/surveys/:survey" component={SurveyQuestions} />
                <Route path="/surveys" component={Surveys} />
                <Route component={Candidates} />
              </Switch>
              <div className="footer">
                &copy; 2017 <a href="https://twitter.com/nick_p">Nick Poulden</a>
                <span>&bull;</span>
                <a href="https://twitter.com/BoulderVote"><i className="fa fa-lg fa-twitter mr-2" /></a>
                <a href="https://github.com/nick/boulder-vote"><i className="fa fa-lg fa-github" /></a>
              </div>
            </div>
          </div>
        )
    }
}

export default App
