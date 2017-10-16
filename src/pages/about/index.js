import React from 'react'
import ReactDisqusComments from 'react-disqus-comments';
import { Helmet } from 'react-helmet';

const About = () => {
    return (
      <div className="row">
        <Helmet title="About BoulderVote.com" />
        <div className="col-md-3" />
        <div className="col-md-6">
          <h3 className="mt-3">About</h3>
          <p>
            I created BoulderVote.com to help voters in Boulder get to know the
            candidates and issues for Boulder City Council.
          </p>
          <p>
            If you have ideas on how to make the site better, please post in
            the comments below, or tweet me <a href="https://twitter.com/nick_p">@nick_p</a>. If you&rsquo;re a
            programmer, you can help also dive in at <a href="https://github.com/nick/boulder-vote">GitHub</a> - the site is completely open source.
          </p>

          <ReactDisqusComments
            shortname="boulder-vote"
            identifier="about"
            url="https://bouldervote.com/about"
          />
        </div>
      </div>
    )
}

export default About
