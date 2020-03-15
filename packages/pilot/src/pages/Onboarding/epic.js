import {
  mergeMap,
} from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import {
  QUESTION_REQUEST,
  receiveOnboardingQuestion,
  failOnboardingRequest,
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

export default combineEpics(loadQuestionEpic)
