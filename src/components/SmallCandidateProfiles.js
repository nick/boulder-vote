import React, { Component } from 'react';
import { withRouter } from 'react-router'

class SmallCandidateProfiles extends Component {
    constructor(props) {
        super(props)
        this.state = { marginLeft: 0 };
    }
    render() {
        return (
          <div className="mini-candidates-wrap">
            {this.props.candidates.map((c) =>
              <div key={c.id}>
                <div
                  className={`mini-candidate${this.props.selected === c.id ? ' active' : ''}`}
                  onClick={() => {
                    if (this.props.onSelect) {
                      this.props.onSelect(c.id)
                    }
                    else {
                      this.props.history.push(`/candidate/${c.id}`)
                    }
                  }}
                >
                  <div
                    className="candidate-img"
                    style={{
                      backgroundImage: `url(https://i.vimeocdn.com/video/${c.videoThumbnail}_640.png)`,
                      backgroundPositionX: c.offsetX || '50%',
                      backgroundPositionY: c.offsetY || '5%',
                      backgroundSize: c.thumbnailSize || '275%'
                    }}
                  ><div className="c" /></div>
                  <h5>{c.name.split(' ').map((c, idx) => <div key={idx}>{c}</div>)}</h5>
                </div>
              </div>
            )}
          </div>
        )
    }
}

export default withRouter(SmallCandidateProfiles);
