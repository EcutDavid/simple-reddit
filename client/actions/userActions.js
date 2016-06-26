export const CHANGE_LOGIN_STATE = 'CHANGE_LOGIN_STATE'

export function changeLoginState(username, password, user) {
  return dispatch => {
    return dispatch({
      type: CHANGE_LOGIN_STATE,
      payload: {
        username,
        password,
        id: user._id
      }
    })
  }
}

export function userLogout() {
  return dispatch => {
    return dispatch({
      type: CHANGE_LOGIN_STATE,
      payload: {
        isLogout : true
      }
    })
  }
}
