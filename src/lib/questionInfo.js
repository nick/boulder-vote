import shuffleEachDay from './shuffleEachDay'
import CandidateData from '../data/Candidates'

export default function questionInfo(question) {

    var candidatesWithAnswersIds = question.answers.filter(a => a.answer).map(a => a.id),
        candidatesNoAnswer = CandidateData.filter(c => candidatesWithAnswersIds.indexOf(c.id) < 0).map(c => c.id),
        firstAnswer;

    var firstCandidateWithAnswer = shuffleEachDay(CandidateData).find(c =>
        candidatesWithAnswersIds.indexOf(c.id) >= 0
    )
    if (firstCandidateWithAnswer) {
        firstAnswer = question.answers.find(a => a.id === firstCandidateWithAnswer.id);
    }

    return { firstAnswer, candidatesNoAnswer };
}
