import { createAction } from 'redux-actions'

export const QUESTION_REQUEST = 'pilot/onboarding/QUESTION_REQUEST'
export const requestOnboardingQuestion = createAction(QUESTION_REQUEST)

export const QUESTION_RECEIVE = 'pilot/onboarding/QUESTION_RECEIVE'
export const receiveOnboardingQuestion = createAction(QUESTION_RECEIVE)

export const ONBOARDING_REQUEST_FAIL = 'pilot/onboarding/ONBOARDING_REQUEST_FAIL'
export const failOnboardingRequest = createAction(ONBOARDING_REQUEST_FAIL)
