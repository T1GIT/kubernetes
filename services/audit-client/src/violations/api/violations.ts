import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

export const violationsApi = {
  getAll: () => useQuery({
    queryKey: ['violations'],
    queryFn: () => axios.request({
      method: 'GET',
      url: '/audit/violations',
    }),
    select: ({ data }) => data,
  }),
}
