/* eslint-disable sort-keys */
import PlataformNotFound from './data/deadEnds/PlataformNotFound'

import Box from './data/icons/box.svg'
import Code from './data/icons/code.svg'
import Money from './data/icons/money.svg'
import Split from './data/icons/split.svg'

/**
 * ESTE ARQUIVO AINDA SERÁ ALTERADO ANTES DO MERGE DO PR,
 * COM AS INFORMAÇÕES CORRETAS QUE SERÃO USADAS EM PRODUÇÃO.
 */

const initialQuestion = 'integrationType'

const settingsByQuestion = {
  integrationType: {
    images: [Box, Code],
    progressPercent: 0,
    questionId: '1',
    type: 'card',
    nextByAnswer: answer => (answer === 'developer'
      ? 'objectiveAtPagarme'
      : 'choosePlataform'),
  },
  objectiveAtPagarme: {
    images: [Money, Split],
    progressPercent: 20,
    questionId: '3',
    type: 'card',
    nextByAnswer: () => 'alreadySelling',
  },
  choosePlataform: {
    placeholder: 'pages.onboarding.placeholders.plataform',
    progressPercent: 20,
    questionId: '2',
    type: 'drop-down',
    nextByAnswer: (answer) => {
      switch (answer) {
        case 'another_plataform': {
          return 'plataformNotFound'
        }

        default: {
          return 'alreadySelling'
        }
      }
    },
  },
  plataformNotFound: {
    deadEnd: PlataformNotFound,
    finalStep: true,
  },
  alreadySelling: {
    progressPercent: 40,
    questionId: '4',
    type: 'card',
    nextByAnswer: (answer) => {
      switch (answer) {
        case 'yes': {
          return 'currentPayment'
        }

        default: {
          return 'isSiteReady'
        }
      }
    },
  },
  isSiteReady: {
    progressPercent: 60,
    questionId: '5',
    type: 'card',
    nextByAnswer: () => 'tpv',
  },
  currentPayment: {
    progressPercent: 60,
    questionId: '6',
    type: 'drop-down',
    nextByAnswer: () => 'tpv',
  },
  tpv: {
    progressPercent: 80,
    questionId: '7',
    type: 'drop-down',
    finalStep: true,
  },
}

export {
  initialQuestion,
  settingsByQuestion,
}
