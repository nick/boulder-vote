import SurveyData from '../src/data/Surveys'

var answers = [];
SurveyData.forEach(s =>
  s.questions.forEach(q =>
    q.answers.filter(a => a.answer).forEach(a => {
      answers.push({
        survey: s.id,
        question: q.id,
        candidate: a.id,
        answer: a.answer
      })
    })
  )
)

console.log(JSON.stringify(answers, null, 4))
