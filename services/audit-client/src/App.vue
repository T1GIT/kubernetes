<script lang="ts" setup>
import type { MenuItem } from 'primevue/menuitem'
import { RoutePath } from '@/shared/constants/route-path'
import Menubar from 'primevue/menubar'

const items: MenuItem[] = [
  {
    label: 'Нарушения',
    icon: 'bi bi-exclamation-triangle-fill',
    route: RoutePath.VIOLATIONS,
  },
  {
    label: 'Восстановление',
    icon: 'bi bi-bandaid-fill',
    route: RoutePath.REPAIRS,
  },
]
</script>

<template>
  <div class="size-full flex flex-col p-2 gap-5 bg-gray-50">
    <Menubar :model="items" class="mx-auto">
      <template #item="{ item, props }">
        <router-link v-slot="{ href, navigate, isActive }" :to="item.route" custom>
          <a
            v-ripple :href="href"
            v-bind="props.action"
            class="rounded"
            :class="{ 'bg-emerald-100': isActive }"
            @click="navigate"
          >
            <span v-if="item.icon" :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </Menubar>

    <RouterView class="flex-1 mx-auto w-full max-w-[1500px] overflow-hidden" />
  </div>
</template>
