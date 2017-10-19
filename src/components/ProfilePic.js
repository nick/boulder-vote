import React, { Component } from 'react';
import { withRouter } from 'react-router'

class ProfilePic extends Component {
    render() {
        var c = this.props.candidate;
        return (
          <div
            className="candidate-profile"
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
        )
    }
}

export default withRouter(ProfilePic);
