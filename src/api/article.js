/* eslint-disable camelcase */
import request from '@/utils/request'

export const getArticles = ({
  // eslint-disable-next-line camelcase
  channel_id,
  timestamp,
  // eslint-disable-next-line no-trailing-spaces
  with_top 
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id,
      timestamp,
      with_top
    }
  })
}
