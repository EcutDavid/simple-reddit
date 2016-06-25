export const CHANGE_LOGIN_STATE = 'CHANGE_LOGIN_STATE'

export function changeLoginState(alreadyLogin) {
  return (dispatch) => {
    dispatch({ type: CHANGE_LOGIN_STATE, payload: alreadyLogin })
  }
}
