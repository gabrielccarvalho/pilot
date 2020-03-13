import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Flexbox,
  Grid,
  Row,
} from 'former-kit'
import AccessDocs from './AccessDocs'
import AccessWelcomeMaterial from './AccessWelcomeMaterial'
import Fees from './Fees'
import AccessKeys from './AccessKeys'
import WelcomeMessage from '../../components/WelcomeMessage'
import styles from './styles.css'

const EmptyState = ({
  apiKey,
  encryptionKey,
  environment,
  fees,
  isAdmin,
  onDisableWelcome,
  onboardingAnswers,
  t,
  userName,
}) => (
  <Grid>
    <Row>
      <Col
        align="center"
        desk={4}
        palm={12}
        tablet={12}
        tv={4}
      >
        <WelcomeMessage
          onDisableWelcome={onDisableWelcome}
          userName={userName}
          t={t}
        />
      </Col>
      <Col
        align="center"
        desk={8}
        palm={12}
        tablet={12}
        tv={8}
      >
        <Flexbox className={styles.accountInfo}>
          <AccessDocs t={t} onboardingAnswers={onboardingAnswers} />
          <AccessWelcomeMaterial t={t} />
          <Fees fees={fees} t={t} />
          { isAdmin
            && (
              <AccessKeys
                apiKey={apiKey}
                encryptionKey={encryptionKey}
                environment={environment}
                t={t}
              />
            )
          }
        </Flexbox>
      </Col>
    </Row>
  </Grid>
)

EmptyState.propTypes = {
  apiKey: PropTypes.string,
  encryptionKey: PropTypes.string,
  environment: PropTypes.string.isRequired,
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
  isAdmin: PropTypes.bool,
  onboardingAnswers: PropTypes.shape({}).isRequired,
  onDisableWelcome: PropTypes.func,
  t: PropTypes.func.isRequired,
  userName: PropTypes.string,
}

EmptyState.defaultProps = {
  apiKey: '',
  encryptionKey: '',
  fees: {},
  isAdmin: false,
  onDisableWelcome: () => {},
  userName: '',
}

export default EmptyState
