import React, { Component } from 'react';
import { withRouter } from 'react-router'

var moment = require('moment');
var seedrandom = require('seedrandom');
var shuffle = require('shuffle-array');

class CandidateProfiles extends Component {
    render() {
        var today = moment().format('YYYY-MM-DD');
        var shuffleOptions = {
            'copy': true,
            'rng': seedrandom(today)
        };
        var shuffledCandidates = shuffle(
            this.props.candidates,
            shuffleOptions);
        return (
          <div className="row">
            {shuffledCandidates.map(c =>
              <div key={c.id} className="col-md-6 col-lg-4 col-xl-3">
                <div className="candidate" onClick={() =>
                  this.props.history.push(`/candidate/${c.id}`)
                }>
                  <div
                    className="candidate-img"
                    style={{
                      backgroundImage: `url(https://i.vimeocdn.com/video/${c.videoThumbnail}_640.png)`,
                      backgroundPositionX: c.offsetX || '50%',
                      backgroundPositionY: c.offsetY || '5%',
                      backgroundSize: c.thumbnailSize || '275%'
                    }}
                  />
                  <h5>{c.name}</h5>
                  <a
                    className="website"
                    href={c.website}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    children={c.website.replace(/^http:\/\//, '')}
                  />
                  <div className="social">
                    {!c.facebook ? null :
                      <a
                        className="social-icon fb"
                        onClick={(e) => e.stopPropagation()}
                        href={`https://facebook.com/${c.facebook}`}
                        target="_blank"
                      ><i className="fa fa-facebook" /></a>
                    }
                    {!c.twitter ? null :
                      <a
                        className="social-icon tw"
                        onClick={(e) => e.stopPropagation()}
                        href={`https://twitter.com/${c.twitter}`}
                        target="_blank"
                      ><i className="fa fa-twitter" /></a>
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        )
    }
}

export default withRouter(CandidateProfiles);
