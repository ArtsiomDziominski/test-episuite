<template>
  <div v-if="blockData && factors" class="ma-3">
    <div class="table-responsive">
      <v-table class="table-hover">
        <thead>
          <tr>
            <th v-for="header in tableHeaders" :key="header.key" :class="header.class">
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(factor, index) in factors" :key="index">
            <td>{{ factor.type }}</td>
            <td>{{ factor.description }}</td>
            <td class="text-end">{{ factor.fragmentCount }}</td>
            <td class="text-end">{{ formatNumber(factor.coefficient, { minimumFractionDigits: 2, maximumFractionDigits: 2, useExponential: false }) }}</td>
            <td class="text-end">{{ formatNumber(factor.contribution, { minimumFractionDigits: 2, maximumFractionDigits: 2, useExponential: false }) }}</td>
            <td class="text-end">{{ factor.trainingCount || 0 }}</td>
            <td class="text-end">{{ factor.validationCount || 0 }}</td>
          </tr>
        </tbody>
        <tfoot v-if="estimatedValue">
          <tr>
            <th>Log K<sub>OW</sub></th>
            <td colspan="6" class="text-end">
              {{ formatNumber(estimatedValue, { minimumFractionDigits: 2, maximumFractionDigits: 2, useExponential: false }) }}
            </td>
          </tr>
        </tfoot>
      </v-table>
    </div>
  </div>
  <div v-else class="text-center text-grey pa-4">
    No data to display
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatNumber } from '@/utils/format'
import type { DataBlock } from '@/types/api'

interface Props {
  blockData: DataBlock | null
}

const props = defineProps<Props>()

const tableHeaders = [
  { key: 'value', label: 'Value', class: '' },
  { key: 'description', label: 'Description', class: '' },
  { key: 'number', label: 'Number', class: 'text-end' },
  { key: 'coefficient', label: 'Coefficient', class: 'text-end' },
  { key: 'contribution', label: 'Contribution', class: 'text-end' },
  { key: 'trainingCount', label: 'Training Count', class: 'text-end' },
  { key: 'validationCount', label: 'Validation Count', class: 'text-end' }
]

const factors = computed(() => {
  if (!props.blockData?.estimatedValue?.model?.factors) return null
  return props.blockData.estimatedValue.model.factors
})

const estimatedValue = computed(() => {
  return props.blockData?.estimatedValue?.value || null
})
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}
</style>
