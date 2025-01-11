import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

export const repairsApi = {
  getAll: () => useQuery({
    queryKey: ['repairs'],
    queryFn: () => axios.request({
      method: 'GET',
      url: '/audit/repairs',
    }),
    select: ({ data }) => data,
  }),
}
