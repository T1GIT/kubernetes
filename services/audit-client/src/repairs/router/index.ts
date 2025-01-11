import type { RouteRecordRaw } from 'vue-router'
import { RoutePath } from '@/shared/constants/route-path'

export const repairsRoute: RouteRecordRaw = {
  path: RoutePath.REPAIRS,
  component: () => import('@/repairs/views/RepairsView.vue'),
}
