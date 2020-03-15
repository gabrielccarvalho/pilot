import { merge } from 'ramda'
import {
  QUESTION_REQUEST,
  QUESTION_RECEIVE,
  ONBOARDING_REQUEST_FAIL,
} from './actions'

const initialState = {
  error: null,
  loading: true,
}

export default function onboardingReducer (state = initialState, action) {
  switch (action.type) {
    case QUESTION_REQUEST: {
      return merge(state, { loading: true })
    }

    case QUESTION_RECEIVE: {
      return merge(state, { loading: false, question: action.payload })
    }

    case ONBOARDING_REQUEST_FAIL: {
      return merge(state, {
        error: action.payload,
        loading: false,
      })
    }

    default: {
      return state
    }
  }
}
