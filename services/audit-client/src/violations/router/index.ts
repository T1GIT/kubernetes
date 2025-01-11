import type { RouteRecordRaw } from 'vue-router'
import { RoutePath } from '@/shared/constants/route-path'

export const violationsRoute: RouteRecordRaw = {
  path: RoutePath.VIOLATIONS,
  component: () => import('@/violations/views/ViolationsView.vue'),
}
