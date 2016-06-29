import request from 'superagent'

export const UPDATA_POST = 'UPDATA_POST'
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
        const { err: resErr, data } = res.body
        if (!resErr) {
          return dispatch({
            type: UPDATA_POST,
            payload: data
          })
        }
      })
  }
}
