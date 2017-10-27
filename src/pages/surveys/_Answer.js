import React from 'react';

import CandidateData from '../../data/Candidates'

import styleHtml from '../../lib/styleHtml'
import ProfilePic from '../../components/ProfilePic'
// import Rate from '../../components/Rate';

function onClickTweet(e, tweet) {
    e.preventDefault();
    var windowOpts = 'width=440,height=250,status=no,menubar=no,titlebar=no';
    window.open(tweet, '_blank', windowOpts);
}

const Answer = (props) => {
    const candidate = CandidateData.find(q => q.id === props.candidateId);
    const pageURL = `https://bouldervote.com${props.path}`,
          encodedURL = encodeURIComponent(pageURL),
          answers = props.question.answers,
          candidateAnswer = answers.find(q => q.id === props.candidateId),
          tweet = `https://twitter.com/intent/tweet?url=${encodedURL}&text=@${candidate.twitter}`;

    return (
      <div className="d-flex">
        <ProfilePic candidate={candidate} />
        <div style={{ marginLeft: '1.5rem' }}>
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
      </div>
    )
}

export default Answer;
