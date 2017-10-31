import React from 'react';

import TopicData from '../../data/Topics'
import SideBarLink from '../../components/SideBarLink'

const TopicTree = (props) => {
    const { topicId, candidateId } = props;
    return (
      <ul className="list-unstyled">
        {TopicData.map(t => [
          <SideBarLink
            key={t.id}
            location={props.location}
            href={`/topics/${t.id}`}
            children={t.name}
            exact
          />,
          t.id !== topicId ? null : (
            t.questions.map(q =>
              <SideBarLink
                key={`${q.survey.id}-${q.id}`}
                location={props.location}
                style={{ paddingLeft: '1.5rem' }}
                href={`/topics/${t.id}/${q.survey.id}/${q.id}${candidateId ? '/' + candidateId : ''}`}
                children={q.questionShort}
              />
            )
          )
        ])}
      </ul>
    )
}

export default TopicTree;
