import CandidateData from "./Candidates"

const Issues = []

export default Issues.map(i =>
  Object.assign({}, i, {
    answers: i.answers.map(a =>
      Object.assign({}, a, {
        candidates: CandidateData.filter(c => {
          var issue = c.issues.find(ci => ci.id === i.id)
          return issue && issue.answer === a.id
        })
      })
    )
  })
)
