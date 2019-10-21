import BARHAQuestions from "./survey-questions/BARHA"
import BoulderChamberQuestions from "./survey-questions/BoulderChamber"
import PlanBoulderQuestions from "./survey-questions/PlanBoulder"
import SierraClubQuestions from "./survey-questions/SierraClub"
import OpenBoulderQuestions from "./survey-questions/OpenBoulder"

function candidateResponses(survey) {
  var uniqueCandidates = new Set()
  survey.questions.forEach(q => {
    q.answers.filter(a => a.answer).forEach(a => uniqueCandidates.add(a.id))
  })
  return Array.from(uniqueCandidates)
}

const SurveyData = []

export default SurveyData.map(s => {
  var responses = candidateResponses(s),
    questions = s.questions.filter(q => q.question)
  return Object.assign({}, s, {
    questionCount: questions.length,
    questions: questions.map(q =>
      Object.assign({}, q, {
        answerIds: q.answers.filter(a => a.answer).map(a => a.id)
      })
    ),
    responseCount: responses.length,
    responseIds: responses
  })
}).sort((a, b) => {
  if (a.responseCount < b.responseCount) {
    return 1
  }
  if (a.responseCount > b.responseCount) {
    return -1
  }
  return a.questionCount < b.questionCount ? 1 : -1
})
