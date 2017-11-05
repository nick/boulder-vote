import { makeExecutableSchema } from 'graphql-tools'
import shuffleEachDay from './lib/shuffleEachDay'

import GroupData from './data/Groups'
import CandidateData from './data/Candidates'
import TopicData from './data/Topics'
import SurveyData from './data/Surveys'
import BallotIssueData from './data/BallotIssues'
import IssueData from './data/Issues'

const typeDefs = `
  type Group {
    id: String!
    name: String
    website: String
    endorsements: String
    facebook: String
    twitter: String
  }

  type Candidate {
    id: String!
    name: String
    firstName: String
    lastName: String
    website: String
    facebook: String
    twitter: String
    email: String
    age: Int
    yearsInBoulder: Int
    video: String
    videoThumbnail: String
    thumbnailSize: String
    offsetX: String
    offsetY: String
    dailyCameraProfile: String
    dailyCameraHeadline: String
    blueLineProfile: String
    boulderChamberQA: String
    endorsements: [Group]
    topics: [Topic]
    surveys: [AnsweredSurvey]
  }

  type Survey {
    id: String!
    name: String
    shortName: String
    questions: [Question]
    question(id: String!): Question

    questionCount: Int
    responseCount: Int
    responseIds: [String]
  }

  type AnsweredSurvey {
    id: String!
    name: String
    questionId: String
    answerId: String
  }

  type Question {
    id: String!
    questionId: String
    number: String
    question: String
    questionShort: String
    topics: [Topic]
    answers: [Answer]
    answerCount: Int
    answerIds: [String]
    answer(id: String!): Answer
    surveyId: String
  }

  type Answer {
    id: String!
    answer: String
  }

  type TopicQuestion {
    id: String!
    question: String
    questionId: String
    questionShort: String
    answerCount: Int
    surveyId: String
  }

  type Topic {
    id: String!
    name: String
    questionCount: Int
    questions: [TopicQuestion]
  }

  type BallotIssueAnswer {
    id: String!
    text: String!
  }

  type BallotIssue {
    id: String!
    name: String
    shortName: String
    description: String
    shortDescription: String
    caps: String
    text: String
    answers: [BallotIssueAnswer]
    summary: String
    commentsAgainst: String
    commentsFor: String
  }

  type IssueAnswer {
    id: String!
    description: String!
    candidates: [Candidate]
  }

  type Issue {
    id: String!
    name: String!
    question: String!
    source: String
    answers: [IssueAnswer]
  }

  type Query {
    candidates: [Candidate]
    candidate(id: String!): Candidate
    endorsement(id: String!): [Candidate]
    groups: [Group]
    group(id: String!): Group
    topics: [Topic]
    topic(id: String!): Topic
    surveys: [Survey]
    survey(id: String!): Survey
    ballotIssues: [BallotIssue]
    ballotIssue(id: String!): BallotIssue
    issues: [Issue]
    issue(id: String!): Issue
  }
`;

const resolvers = {
  Query: {
    surveys: () => SurveyData,
    survey: (_, { id }) => SurveyData.find(c => c.id === id),

    topics: () => shuffleEachDay(TopicData),
    topic: (_, { id }) => TopicData.find(c => c.id === id),

    candidates: () => shuffleEachDay(CandidateData),
    candidate: (_, { id }) => CandidateData.find(c => c.id === id),
    endorsement: (_, { id }) => shuffleEachDay(CandidateData.filter(c =>
        c.endorsements.indexOf(id) >= 0
    )),

    groups: () => shuffleEachDay(GroupData),
    group: (_, { id }) => GroupData.find(g => g.id === id),

    ballotIssues: () => BallotIssueData,
    ballotIssue: (_, { id }) => BallotIssueData.find(g => g.id === id),

    issues: () => shuffleEachDay(IssueData),
    issue: (_, { id }) => IssueData.find(g => g.id === id),
  },
  Candidate: {
    endorsements: (candidate) => shuffleEachDay(GroupData.filter((g) => candidate.endorsements.indexOf(g.id) >= 0)),
    topics: (candidate) => {
      var topics = [];
      SurveyData.forEach(s => {
          s.questions.filter(q => q.question && q.topics).forEach(q => {
              if (q.answers.some(a => a.id === candidate.id && a.answer)) {
                  (q.topics || []).forEach(t => {
                      if (topics.indexOf(t) < 0) {
                          topics.push(t);
                      }
                  })
              }
          })
      })
      return shuffleEachDay(TopicData.filter(t => topics.indexOf(t.id) >= 0));
    },
    surveys: (candidate) => {
      var surveys = [];
      SurveyData.forEach(s => {
          var didAnswer = false;
          s.questions.filter(q => q.question).forEach(q => {
              var candidateAnswer = q.answers.find(a => a.id === candidate.id && a.answer);
              if (!didAnswer && candidateAnswer) {
                  if (surveys.indexOf(s) < 0) {
                      surveys.push({
                          id: s.id,
                          name: s.shortName,
                          questionId: q.id,
                          answerId: candidateAnswer.id
                      });
                      didAnswer = true;
                  }
              }
          })
      })
      return shuffleEachDay(surveys);
    }
  },
  Survey: {
    questions: (survey) => survey.questions,
    question: (survey, { id }) => survey.questions.find(q => q.id === id)
  },
  Question: {
    answers: (question) => question.answers.filter(a => a.answer),
    answer: (question, { id }) => question.answers.find(q => q.id === id),
    answerCount: (question) => question.answers.filter(a => a.answer).length,
    topics: (question) => TopicData.filter((t) => question.topics.indexOf(t.id) >= 0)
  }
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
