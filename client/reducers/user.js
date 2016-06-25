import Immutable from 'immutable'

import { CHANGE_LOGIN_STATE } from 'actions/userActions'


const initialState = Immutable.fromJS({
  alreadyLogin: false
})

export default function user (state = initialState, action) {
  switch (action.type) {
  case CHANGE_LOGIN_STATE:
    state = state.set('alreadyLogin', action.payload)
    return state
  default:
    return state
  }
}
