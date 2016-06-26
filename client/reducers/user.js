import Immutable from 'immutable'

import { CHANGE_LOGIN_STATE } from 'actions/userActions'


const initialState = Immutable.fromJS({
  alreadyLogin: false,
  password: undefined,
  username: undefined,
  id: undefined
})

export default function user (state = initialState, action) {
  switch (action.type) {
  case CHANGE_LOGIN_STATE:
    if (action.payload.isLogout) {
      state = state.set('alreadyLogin', false)
      return state
    }
    const { password, username, id } = action.payload
    state = state.set('alreadyLogin', true)
    state = state.set('password', password)
    state = state.set('username', username)
    state = state.set('id', id)
    return state
  default:
    return state
  }
}
