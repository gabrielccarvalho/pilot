import {
  ONBOARDING_ANSWERS_RECEIVE,
  ONBOARDING_ANSWERS_RESET,
} from './actions'

const initialState = {
  onboardingAnswers: null,
}

export default function welcomeReducer (state = initialState, action) {
  switch (action.type) {
    case ONBOARDING_ANSWERS_RECEIVE: {
      const {
        payload,
      } = action

      return { onboardingAnswers: payload }
    }

    case ONBOARDING_ANSWERS_RESET: {
      return { onboardingAnswers: null }
    }

    default: {
      return state
    }
  }
}
