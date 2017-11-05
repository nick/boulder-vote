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
            {(this.props.candidates || []).map((c) => {
              var disabled = false;
              if (this.props.disabled && this.props.disabled.indexOf(c.id) >= 0) {
                  disabled = true;
              } else if (this.props.enabled && this.props.enabled.indexOf(c.id) < 0) {
                  disabled = true;
              }
              var href = `${this.props.urlPrefix || '/candidate'}/${c.id}`;
              return (
                <a
                  key={c.id}
                  className={`candidate-name${this.props.selected === c.id ? ' active' : ''}${disabled ? ' disabled' : ''}`}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (disabled) {
                      return;
                    }
                    if (this.props.onSelect) {
                      this.props.onSelect(c.id)
                    }
                    else {
                      this.props.history.push(href)
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
