import BoxIcon from './box.svg'

export default {
  withCardIconAndSubtitle: {
    isFirstQuestion: true,
    loading: false,
    question: {
      label: 'integration',
      options: [
        {
          description: 'Sem a necessidade de desenvolver código.',
          label: 'Com uma plataforma',
          value: 'plataform',
        },
        {
          description: 'Você precisará desenvolver o código da integração.',
          label: 'Com a API Pagar.me',
          value: 'api',
        },
      ],
      others: [
        {
          label: 'Sou o desenvolvedor do site.',
          type: 'checkbox',
          value: 'is_developer',
        },
      ],
      title: 'Como você pretende integrar com o Pagar.me?',
    },
    questionSettings: {
      images: [BoxIcon, BoxIcon],
      progressPercent: 25,
      type: 'card',
    },
    userName: 'Eduardo',
  },
  withCardIconAndWithoutSubtitle: {
    isFirstQuestion: false,
    loading: false,
    question: {
      label: 'already_selling',
      options: [
        {
          label: 'Sim, já estou vendendo',
          value: 'yes',
        },
        {
          label: 'Ainda não comecei a vender',
          value: 'no',
        },
        {
          label: 'Estou apenas testando o Pagar.me',
          value: 'testing',
        },
      ],
      others: [],
      title: 'Você está vendendo online?',

    },
    questionSettings: {
      images: [BoxIcon, BoxIcon, BoxIcon],
      progressPercent: 50,
      type: 'card',
    },
    userName: 'Eduardo',
  },
  withCardWithoutIconAndSubtitle: {
    isFirstQuestion: false,
    loading: false,
    question: {
      label: 'is_site_ready',
      options: [
        {
          label: 'Sim, só falta integrar com o meio de pagamento.',
          value: 'yes',
        },
        {
          label: 'Não, ele ficará pronto nas próximas semanas.',
          value: 'soon',
        },
        {
          label: 'Não comecei o desenvolvimento do meu site.',
          value: 'no',
        },
        {
          label: 'Vou utilizar apenas o Link de Pagamentos.',
          value: 'link',
        },
      ],
      others: [],
      title: 'Seu site já está pronto?',

    },
    questionSettings: {
      images: [],
      progressPercent: 60,
      type: 'card',
    },
    userName: 'Eduardo',
  },
}
