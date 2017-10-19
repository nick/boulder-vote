import BARHAQuestions from './survey-questions/BARHA';
import BoulderChamberQuestions from './survey-questions/BoulderChamber';

function responses(survey) {
    var uniqueCandidates = new Set();
    survey.questions.forEach(q => {
        q.answers.forEach(a => uniqueCandidates.add(a.id))
    });
    return uniqueCandidates.size;
}

const SurveyData = [
  {
    id: 'barha',
    name: 'Boulder Area Rental Housing Association',
    shortName: 'BARHA',
    questions: BARHAQuestions,
    surveyDate: new Date(2017, 7, 30)
  },
  {
    id: 'boulder-chamber',
    name: 'Boulder Chamber Q&A',
    shortName: 'Boulder Chamber',
    questions: BoulderChamberQuestions
  }
]

export default SurveyData.map(s =>
    Object.assign({}, s, {
        numQuestions: s.questions.length,
        responses: responses(s)
    })
).sort((a, b) => a.numQuestions < b.numQuestions ? 1 : -1)
