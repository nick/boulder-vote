import React, { Component } from 'react';
import { withRouter } from 'react-router'

class SmallCandidateProfiles extends Component {
    constructor(props) {
        super(props)
        this.state = { marginLeft: 0 };
    }
    render() {
        return (
          <div className="candidate-names">
            {this.props.candidates.map((c) => {
              var disabled = this.props.disabled && this.props.disabled.indexOf(c.id) >= 0;
              return (
                <a
                  key={c.id}
                  className={`candidate-name${this.props.selected === c.id ? ' active' : ''}${disabled ? ' disabled' : ''}`}
                  href={`/candidate/${c.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (disabled) {
                      return;
                    }
                    if (this.props.onSelect) {
                      this.props.onSelect(c.id)
                    }
                    else {
                      this.props.history.push(`/candidate/${c.id}`)
                    }
                  }}
                >
                  {c.name.split(' ').map((c, idx) => <div key={idx}>{c}</div>)}
                </a>
              );
            })}
          </div>
        )
    }
}

export default withRouter(SmallCandidateProfiles);
