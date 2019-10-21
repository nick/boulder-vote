import SurveyData from './Surveys';

const Topics = [
  {
    id: 'growth-development',
    name: 'Growth & Development'
  },
  {
    id: 'transportation',
    name: 'Transportation'
  },
  {
    id: 'traffic',
    name: 'Traffic'
  },
  {
    id: 'environment',
    name: 'Environment'
  },
  {
    id: 'municipalization',
    name: 'Municipalization'
  },
  {
    id: 'homelessness',
    name: 'Homelessness'
  },
  {
    id: 'housing-affordability',
    name: 'Affordable Housing'
  },
  {
    id: 'open-space',
    name: 'Open Space'
  },
  {
    id: 'projects-services',
    name: 'Projects & Services'
  },
  {
    id: 'planning-jurisdiction',
    name: 'Planning & Jurisdiction'
  },
  {
    id: 'public-engagement',
    name: 'Public Engagement'
  },
  {
    id: 'candidate-insight',
    name: 'Candidate Insight'
  },
  {
    id: 'rental-market',
    name: 'Rental Market'
  },
]

export default Topics.map(t => {
    var topicQuestions = [];
    SurveyData.forEach(s => {
        s.questions.filter(q => (q.topics || []).indexOf(t.id) >= 0).forEach(q => {
            topicQuestions.push(Object.assign({}, q, {
                id: `${s.id}-${q.id}`,
                questionId: q.id,
                surveyId: s.id,
                answerCount: (q.answers || []).filter(a => a.answer).length
            }))
        });
    });
    return Object.assign({}, t, {
        questionCount: topicQuestions.length,
        questions: topicQuestions
    })
});
