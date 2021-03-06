import moment from 'moment-timezone'

import {
  SEARCH_REQUEST,
  SEARCH_RECEIVE,
  SEARCH_CLEAR,
} from './actions'

const getInitialquery = () => ({
  count: 15,
  dates: {
    end: moment(new Date()).endOf('day'),
    start: moment(new Date()).subtract(30, 'days').startOf('day'),
  },
  filters: {},
  offset: 1,
  search: '',
  sort: {
    field: ['created_at'],
    order: 'descending',
  },
})

const initialState = {
  loading: true,
  query: getInitialquery(),
}

export default function searchReducer (state, action) {
  switch (action.type) {
    case SEARCH_REQUEST: {
      const {
        payload: {
          query,
        },
      } = action

      return {
        loading: true,
        query,
      }
    }

    case SEARCH_RECEIVE: {
      const {
        payload: {
          query,
        },
      } = action

      return {
        loading: false,
        query,
      }
    }

    case SEARCH_CLEAR: {
      return {
        loading: false,
        query: getInitialquery(),
      }
    }

    default:
      return state || initialState
  }
}
