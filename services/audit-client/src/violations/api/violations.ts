import type { ViolationDto } from '@/violations/dto/violation.dto'
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

export const violationsApi = {
  getAll: () => useQuery({
    queryKey: ['violations'],
    queryFn: () => axios.request<ViolationDto[]>({
      method: 'GET',
      url: '/audit/violations',
    }),
    select: ({ data }) => data,
  }),
}
