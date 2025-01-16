<script lang="ts" setup>
import type { ViolationDto } from '@/violations/dto/violation.dto'
import { useSocket } from '@/shared/lib/socket'
import { violationsApi } from '@/violations/api/violations'
import { SIO_VIOLATIONS_EVENT } from '@/violations/const/events'
import { ViolationType } from '@/violations/const/violation-type'
import { FilterMatchMode, FilterOperator } from '@primevue/core'
import { useElementSize, whenever } from '@vueuse/core'
import dayjs from 'dayjs'
import Card from 'primevue/card'
import Chip from 'primevue/chip'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import Messsage from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
import Tag from 'primevue/tag'
import { computed, ref, shallowRef } from 'vue'

const getAllQuery = violationsApi.getAll()
const violations = shallowRef<ViolationDto[]>([])
whenever(() => getAllQuery.data.value, value => violations.value = value, { immediate: true })

const socket = useSocket()
socket.on(SIO_VIOLATIONS_EVENT.VIOLATION, violation => violations.value = [violation, ...violations.value])

const rowData = computed(() => (violations.value ?? []).map(d => ({ ...d, createdAt: new Date(d.createdAt) })))

const filters = ref({
  _id: { value: null, matchMode: FilterMatchMode.CONTAINS },
  type: { value: null, matchMode: FilterMatchMode.IN },
  createdAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
})

const typeLabel: Record<ViolationType, string> = {
  [ViolationType.CONFIG]: 'Конфигурация',
  [ViolationType.INTEGRITY]: 'Приложение',
  [ViolationType.REGISTRY]: 'Установка',
}
const typeIcon: Record<ViolationType, string> = {
  [ViolationType.CONFIG]: 'bi bi-gear-fill',
  [ViolationType.INTEGRITY]: 'bi bi-app-indicator',
  [ViolationType.REGISTRY]: 'bi bi-download',
}

const cardRef = shallowRef()
const { height } = useElementSize(cardRef)
</script>

<template>
  <Card
    ref="cardRef"
    :pt="{
      body: { className: 'overflow-hidden' },
      content: { className: 'overflow-hidden size-full' },
    }"
  >
    <template #content>
      <DataTable
        v-model:filters="filters"
        filter-display="menu"
        data-key="_id"
        :value="rowData"
        scrollable
        :scroll-height="`${height}px`"
        sort-field="createdAt"
        :sort-order="-1"
        table-class="size-full max-w-full rounded-lg"
      >
        <Column field="_id" header="Идентификатор" :sortable="true">
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" placeholder="Фильтр" @input="filterCallback()" />
          </template>
        </Column>

        <Column field="type" header="Тип нарушения" :sortable="true" :show-filter-match-modes="false">
          <template #body="{ data }: {data: ViolationDto}">
            <Tag severity="warn" :icon="typeIcon[data.type]" :value="typeLabel[data.type]" />
          </template>

          <template #filter="{ filterModel }">
            <MultiSelect v-model="filterModel.value" :options="Object.keys(typeLabel)" :option-label="(d: ViolationType) => typeLabel[d]" placeholder="Фильтр" display="chip" />
          </template>
        </Column>

        <Column field="createdAt" header="Дата нарушения" data-type="date" :sortable="true">
          <template #body="{ data }: {data: ViolationDto}">
            {{ dayjs(data.createdAt).format('DD MMMM YYYY, HH:mm:ss') }}
          </template>
          <template #filter="{ filterModel }">
            <DatePicker v-model="filterModel.value" date-format="dd/mm/yy" placeholder="Фильтр" />
          </template>
        </Column>

        <Column field="reference.path" header="Путь конфигурации" :sortable="true">
          <template #body="{ data }: {data: ViolationDto}">
            <Chip :label="data.reference.path" />
          </template>
        </Column>

        <Column field="reference.content" header="Эталонная конфигурация" :sortable="true">
          <template #body="{ data }: {data: ViolationDto}">
            <Messsage
              severity="success"
              :pt="{
                content: { className: 'size-full p-2' },
              }"
            >
              <pre class="m-0 w-full max-h-[200px] max-w-[300px] overflow-auto">{{ data.reference.content }}</pre>
            </Messsage>
          </template>
        </Column>

        <Column field="content" header="Модифицированная конфигурация" :sortable="true">
          <template #body="{ data }: {data: ViolationDto}">
            <Messsage
              severity="warn"
              :pt="{
                content: { className: 'size-full p-2' },
              }"
            >
              <pre class="m-0 w-full max-h-[200px] max-w-[300px] overflow-auto">{{ data.content }}</pre>
            </Messsage>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>
