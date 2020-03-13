import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  always,
  applySpec,
  compose,
  equals,
  find,
  head,
  not,
  path,
  pathOr,
  pluck,
  pipe,
  prop,
  propEq,
  split,
  when,
} from 'ramda'
import { translate } from 'react-i18next'
import {
  requestOnboardingAnswers as requestOnboardingAnswersAction,
} from '../Home/actions'
import EmptyStateContainer from '../../containers/EmptyState'
import { withError } from '../ErrorBoundary'
import environment from '../../environment'

const getUserName = pipe(prop('name'), split(' '), head)

const hasAdminPermission = propEq('permission', 'admin')

const getAccessKeys = applySpec({
  apiKey: path(['api_key', environment]),
  encryptionKey: path(['encryption_key', environment]),
})

const getAntifraudCost = pipe(
  pathOr([], ['gateway', environment, 'antifraud_cost']),
  find(propEq('name', 'pagarme')),
  prop('cost')
)

const notDefaultInstallments = pipe(
  pluck('installment'),
  equals([1, 2, 7]),
  not
)

const getInstallmentsFee = pipe(
  pathOr([], ['psp', environment, 'mdrs']),
  find(propEq('payment_method', 'credit_card')),
  pathOr([], ['installments']),
  when(notDefaultInstallments, always([]))
)

const getFees = pipe(
  prop('pricing'),
  applySpec({
    anticipation: path(['psp', environment, 'anticipation']),
    antifraud: getAntifraudCost,
    boleto: path(['gateway', environment, 'transaction_cost', 'boleto']),
    gateway: path(['gateway', environment, 'transaction_cost', 'credit_card']),
    installments: getInstallmentsFee,
    transfer: path(['transfers', 'ted']),
  })
)

const mapDispatchToProps = {
  requestOnboardingAnswers: requestOnboardingAnswersAction,
}

const mapStateToProps = ({
  account: {
    company,
    user,
  },
  home: {
    onboardingAnswers,
  },
}) => ({
  accessKeys: getAccessKeys(company),
  fees: getFees(company),
  isAdmin: hasAdminPermission(user),
  onboardingAnswers,
  userName: getUserName(user),
})

const enhanced = compose(
  translate(),
  connect(mapStateToProps, mapDispatchToProps),
  withError
)

const hideEmptyState = push => () => {
  localStorage.setItem('hide_empty-state', true)
  return push('/home')
}

const EmptyState = ({
  accessKeys,
  fees,
  history,
  isAdmin,
  onboardingAnswers,
  requestOnboardingAnswers,
  t,
  userName,
}) => {
  useEffect(() => {
    requestOnboardingAnswers()
  }, [requestOnboardingAnswers])

  return (
    <EmptyStateContainer
      apiKey={accessKeys.apiKey}
      encryptionKey={accessKeys.encryptionKey}
      environment={environment}
      fees={fees}
      isAdmin={isAdmin}
      onboardingAnswers={onboardingAnswers}
      onDisableWelcome={hideEmptyState(history.push)}
      t={t}
      userName={userName}
    />
  )
}

EmptyState.propTypes = {
  accessKeys: PropTypes.shape({
    apiKey: PropTypes.string,
    encryptionKey: PropTypes.string,
  }),
  fees: PropTypes.shape({
    anticipation: PropTypes.number,
    antifraud: PropTypes.number,
    boleto: PropTypes.number,
    gateway: PropTypes.number,
    installments: PropTypes.arrayOf(PropTypes.shape({
      installment: PropTypes.number.isRequired,
      mdr: PropTypes.number.isRequired,
    })),
    transfer: PropTypes.number,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onboardingAnswers: PropTypes.shape({}),
  requestOnboardingAnswers: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userName: PropTypes.string,
}

EmptyState.defaultProps = {
  accessKeys: {},
  fees: {},
  onboardingAnswers: {},
  userName: '',
}

export default enhanced(EmptyState)
