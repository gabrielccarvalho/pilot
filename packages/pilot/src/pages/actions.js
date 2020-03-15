import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import account, { epic as accountEpic } from './Account/actions'
import errors, { epic as errorsEpic } from './ErrorBoundary'
import balance from './Balance'
import anticipation, { epic as anticipationEpic } from './Anticipation'
import { reducers as transactionsReducers } from './Transactions'
import home, { epic as homeEpic } from './Home'
import onboarding, { epic as onboardingEpic } from './Onboarding'
import { reducers as recipientsReducers } from './Recipients'

export const rootEpic = combineEpics(
  accountEpic,
  anticipationEpic,
  errorsEpic,
  homeEpic,
  onboardingEpic
)

export const rootReducer = combineReducers({
  account,
  anticipation,
  balance,
  errors,
  home,
  onboarding,
  recipients: recipientsReducers.search,
  transactionDetails: transactionsReducers.details,
  transactions: transactionsReducers.search,
})
