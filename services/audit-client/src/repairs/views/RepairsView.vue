<script lang="ts" setup>
import { repairsApi } from '@/repairs/api/repairs'
import { FilterMatchMode, FilterOperator } from '@primevue/core'
import { useElementSize } from '@vueuse/core'
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

const { data, loading } = repairsApi.getAll()

const rowData = computed(() => (data.value ?? []).map(d => ({ ...d, createdAt: new Date(d.createdAt) })))

const filters = ref({
  _id: { value: null, matchMode: FilterMatchMode.CONTAINS },
  type: { value: null, matchMode: FilterMatchMode.IN },
  createdAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
})

const typeLabel = {
  'repair-config': 'Конфигурация',
  'repair-integrity': 'Приложение',
  'repair-registry': 'Установка',
}
const typeIcon = {
  'repair-config': 'bi bi-gear-fill',
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
        :loading="loading"
        scrollable
        :scroll-height="`${height}px`"
        table-class="size-full max-w-full rounded-lg"
      >
        <Column field="_id" header="Идентификатор" :sortable="true">
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" placeholder="Фильтр" @input="filterCallback()" />
          </template>
        </Column>

        <Column field="type" header="Тип нарушения" :sortable="true" :show-filter-match-modes="false">
          <template #body="{ data }">
            <Tag severity="warn" :icon="typeIcon[data.type]" :value="typeLabel[data.type]" />
          </template>

          <template #filter="{ filterModel }">
            <MultiSelect v-model="filterModel.value" :options="Object.keys(typeLabel)" :option-label="(d) => typeLabel[d]" placeholder="Фильтр" display="chip" />
          </template>
        </Column>

        <Column field="createdAt" header="Дата исправления" data-type="date" :sortable="true">
          <template #body="{ data }">
            {{ dayjs(data.createdAt).format('DD MMMM YYYY, HH:mm:ss') }}
          </template>
          <template #filter="{ filterModel }">
            <DatePicker v-model="filterModel.value" date-format="dd/mm/yy" placeholder="Фильтр" />
          </template>
        </Column>

        <Column field="reference.path" header="Путь конфигурации" :sortable="true">
          <template #body="{ data }">
            <Chip :label="data.violation.reference.path" />
          </template>
        </Column>

        <Column field="content" header="Модифицированная конфигурация" :sortable="true">
          <template #body="{ data }">
            <Messsage
              severity="warn"
              :pt="{
                content: { className: 'size-full p-2' },
              }"
            >
              <pre class="m-0 w-full max-h-[200px] max-w-[300px] overflow-auto">{{ data.violation.content }}</pre>
            </Messsage>
          </template>
        </Column>

        <Column field="reference.content" header="Исправленная конфигурация" :sortable="true">
          <template #body="{ data }">
            <Messsage
              severity="success"
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
