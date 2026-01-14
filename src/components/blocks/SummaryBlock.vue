<template>
  <div v-if="blockData" class="ma-3">
    <v-row>
      <v-col cols="12" md="3">
        <div class="d-flex flex-column align-center justify-center h-100 py-3">
          <small class="text-grey text-center font-weight-semibold mb-2">
            Experimental Log K<sub>OW</sub>
          </small>
          <div class="text-h4 text-primary" v-if="blockData.selectedValue">
            {{ formatNumber(blockData.selectedValue.value, { minimumFractionDigits: 2, maximumFractionDigits: 2, useExponential: false }) }}
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="9">
        <div class="table-responsive">
          <v-table class="table-hover">
            <thead>
              <tr>
                <th></th>
                <th class="text-end">Estimated Value</th>
                <th class="text-end">Experimental Values</th>
                <th>References</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Log K<sub>OW</sub></th>
                <td class="text-end">
                  {{ formatNumber(blockData.estimatedValue?.value, { minimumFractionDigits: 2, maximumFractionDigits: 2, useExponential: false }) }}
                </td>
                <td class="text-end">
                  <ul class="list-unstyled mb-0">
                    <li v-if="blockData.selectedValue">
                      {{ formatNumber(blockData.selectedValue.value, { minimumFractionDigits: 2, maximumFractionDigits: 2, useExponential: false }) }}
                    </li>
                  </ul>
                </td>
                <td>
                  <ul class="list-unstyled mb-0">
                    <li v-for="(exp, idx) in blockData.experimentalValues" :key="idx">
                      <small class="text-nowrap">{{ exp.author }} ({{ exp.year }})</small>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-col>
    </v-row>
  </div>
  <div v-else class="text-center text-grey pa-4">
    No data to display
  </div>
</template>

<script setup lang="ts">
import { formatNumber } from '@/utils/format'
import type { DataBlock } from '@/types/api'

interface Props {
  blockData: DataBlock | null
}

defineProps<Props>()
</script>

<style scoped>
.list-unstyled {
  padding-left: 0;
  list-style: none;
}

.table-responsive {
  overflow-x: auto;
}
</style>
