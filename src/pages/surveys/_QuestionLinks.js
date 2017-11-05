import React from 'react';

import SideBarLink from '../../components/SideBarLink'

const QuestionLinks = (props) => {
    const { survey, candidateId, location } = props;
    if (!survey) { return null; }
    return (
      <ul className="list-unstyled">
        {(survey.questions || []).map(q =>
          <SideBarLink
            key={q.id}
            location={location}
            href={`/surveys/${survey.id}/${q.id}${candidateId ? `/${candidateId}` : ''}`}
            children={q.questionShort}
          />
        )}
      </ul>
    )
}

export default QuestionLinks;
