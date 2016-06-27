import request from 'superagent'

export const UPDATA_POST = 'CHANGE_LOGIN_STATE'
import { apiServiceUrl } from 'config/api'


export function getPosts() {
  return dispatch => {
    request
      .get(`${apiServiceUrl}post`)
      .end((err, res) => {
        if (err) {
          console.error(err)
          return
        }
        return dispatch({
          type: UPDATA_POST,
          payload: res.body
        })
      })
  }
}