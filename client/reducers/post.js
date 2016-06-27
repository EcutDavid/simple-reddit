import Immutable from 'immutable'

import { UPDATA_POST } from 'actions/postActions'


const initialState = Immutable.fromJS({
  posts: []
})

export default function user (state = initialState, action) {
  switch (action.type) {
  case UPDATA_POST:
    state = state.set('posts', action.payload)
    return state
  default:
    return state
  }
}
