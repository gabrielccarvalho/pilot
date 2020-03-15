import { createAction } from 'redux-actions'

export const QUESTION_REQUEST = 'pilot/onboarding/QUESTION_REQUEST'
export const requestOnboardingQuestion = createAction(QUESTION_REQUEST)

export const QUESTION_RECEIVE = 'pilot/onboarding/QUESTION_RECEIVE'
export const receiveOnboardingQuestion = createAction(QUESTION_RECEIVE)

export const POST_ANSWER = 'pilot/onboarding/POST_ANSWER'
export const postOnboardingAnswer = createAction(POST_ANSWER)

export const DESTROY_ANSWER = 'pilot/onboarding/DESTROY_ANSWER'
export const destroyOnboardingAnswer = createAction(DESTROY_ANSWER)

export const ONBOARDING_REQUEST_SUCCESS = 'pilot/onboarding/ONBOARDING_REQUEST_SUCCESS'
export const successOnboardingRequest = createAction(ONBOARDING_REQUEST_SUCCESS)

export const ONBOARDING_REQUEST_FAIL = 'pilot/onboarding/ONBOARDING_REQUEST_FAIL'
export const failOnboardingRequest = createAction(ONBOARDING_REQUEST_FAIL)
