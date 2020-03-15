import {
  mergeMap,
} from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import {
  DESTROY_ANSWER,
  POST_ANSWER,
  QUESTION_REQUEST,
  receiveOnboardingQuestion,
  failOnboardingRequest,
  successOnboardingRequest,
} from './actions'

const loadQuestionEpic = (action$, state$) => action$
  .pipe(
    ofType(QUESTION_REQUEST),
    mergeMap(({ payload: questionId }) => {
      const state = state$.value
      const { account: { client } } = state

      return client.onboardingQuestions.find({ id: questionId })
        .then(receiveOnboardingQuestion)
        .catch(failOnboardingRequest)
    })
  )

const postAnswerEpic = (action$, state$) => action$
  .pipe(
    ofType(POST_ANSWER),
    mergeMap(({ payload }) => {
      const state = state$.value
      const { account: { client } } = state

      return client.onboardingAnswers.create(payload)
        .then(successOnboardingRequest)
        .catch(failOnboardingRequest)
    })
  )

const destroyAnswerEpic = (action$, state$) => action$
  .pipe(
    ofType(DESTROY_ANSWER),
    mergeMap(({ payload: questionId }) => {
      const state = state$.value
      const { account: { client } } = state

      return client.onboardingAnswers.destroy({ question_id: questionId })
        .then(successOnboardingRequest)
        .catch(failOnboardingRequest)
    })
  )

export default combineEpics(destroyAnswerEpic, loadQuestionEpic, postAnswerEpic)
