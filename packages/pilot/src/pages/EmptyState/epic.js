import { of as rxOf } from 'rxjs'
import {
  catchError,
  map,
  mergeMap,
} from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import {
  failOnboardingAnswers,
  ONBOARDING_ANSWERS_REQUEST,
  receiveOnboardingAnswers,
} from './actions'

const onboardingAnswersEpic = (action$, state$) => action$
  .pipe(
    ofType(ONBOARDING_ANSWERS_REQUEST),
    mergeMap(() => {
      const state = state$.value
      const { account: { client } } = state
      return client.onboardingAnswers.all()
    }),
    map(receiveOnboardingAnswers),
    catchError((error) => {
      const { message } = error

      return rxOf(failOnboardingAnswers({ message }))
    })
  )

export default combineEpics(onboardingAnswersEpic)
