import React from 'react';

import styleHtml from '../lib/styleHtml'
import ProfilePic from './ProfilePic'
// import Rate from './components/Rate';

function onClickTweet(e, tweet) {
    e.preventDefault();
    var windowOpts = 'width=440,height=250,status=no,menubar=no,titlebar=no';
    window.open(tweet, '_blank', windowOpts);
}

const CandidateAnswer = (props) => {
    const candidate = props.candidate;
    if (!candidate) { return null; }
    
    const pageURL = `https://bouldervote.com${props.path}`,
          encodedURL = encodeURIComponent(pageURL),
          candidateAnswer = props.question.answer,
          tweet = `https://twitter.com/intent/tweet?url=${encodedURL}&text=@${candidate.twitter}`;

    return (
      <div className="candidate-answer">
        <ProfilePic candidate={candidate} />
        {(!candidateAnswer || !candidateAnswer.answer)
          ? <i>{`No response from ${candidate.name}`}</i>
          : (
            <div>
              {styleHtml(candidateAnswer.answer)}
              {!candidate.twitter ? null :
                <div className="mt-2">
                  <a href={tweet} onClick={(e) => onClickTweet(e, tweet)}>
                    <i className="fa fa-twitter mr-1" />
                    {`Tweet @${candidate.twitter} about this issue`}
                  </a>
                </div>
              }
              {/* <Rate /> */}
            </div>
          )
        }
      </div>
    )
}

export default CandidateAnswer;
