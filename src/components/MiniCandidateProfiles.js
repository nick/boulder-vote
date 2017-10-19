import React, { Component } from 'react';
import { withRouter } from 'react-router'

class MineCandidateProfiles extends Component {
    constructor(props) {
        super(props)
        this.state = { marginLeft: 0 };
    }
    render() {
        return (
          <div className="mini-candidates-more-wrap">
            <div className="mini-candidates-overflow">
              <div className="mini-candidates-wrap"
                style={{ marginLeft: this.state.marginLeft, width: `calc(50vw + ${85*this.props.candidates.length}px)` }}
              >
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
            </div>
            <div className="more">
              {/* <a
                href="#"
                className="btn btn-sm btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(this.state.marginLeft )
                  this.setState({ marginLeft: this.state.marginLeft - 200 })
                }}
              >
                More <i className="fa fa-chevron-right ml-1" />
              </a> */}
            </div>
          </div>
        )
    }
}

export default withRouter(MineCandidateProfiles);
