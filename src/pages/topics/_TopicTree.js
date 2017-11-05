import React from 'react';

import SideBarLink from '../../components/SideBarLink'

const TopicTree = (props) => {
    const { topic, candidateId, topics } = props;
    if (!topics) { return null; }
    return (
      <ul className="list-unstyled">
        {topics.map(t => [
          <SideBarLink
            key={t.id}
            location={props.location}
            href={`/topics/${t.id}`}
            children={t.name}
            exact
          />,
          t.id !== topic.id ? null : (
            topic.questions.map(q =>
              <SideBarLink
                key={q.id}
                location={props.location}
                style={{ paddingLeft: '1.5rem' }}
                href={`/topics/${t.id}/${q.surveyId}/${q.questionId}${candidateId ? '/' + candidateId : ''}`}
                children={q.questionShort}
              />
            )
          )
        ])}
      </ul>
    )
}

export default TopicTree;
